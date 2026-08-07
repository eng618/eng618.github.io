import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const MASTER_FILE = path.join(DATA_DIR, 'career.json');

// --- Zod Schema Definitions ---

const PersonalSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  website: z.string().min(1),
  github: z.string().min(1),
  linkedin: z.string().min(1),
  summary: z.string().min(1),
});

const ExperienceEntrySchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  showOnResume: z.boolean(),
  bullets: z.array(z.string()),
});

const CvTimelineEntrySchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
});

const SkillsSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  tooling: z.array(z.string()),
  standards: z.array(z.string()),
});

const ProjectEntrySchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['featured', 'github']),
  stars: z.number().optional(),
  forks: z.number().optional(),
  issues: z.number().optional(),
  url: z.string(),
  showOnResume: z.boolean(),
});

const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
});

// Validator pattern for YYYY-MM
const CompletedDateSchema = z.string().regex(/^\d{4}-\d{2}$/, {
  message: 'completedDate must match the format YYYY-MM (e.g. 2026-05)',
});

const CertificationSchema = z.object({
  title: z.string().min(1),
  authority: z.string().min(1),
  completedDate: CompletedDateSchema,
  description: z.string().optional(),
  url: z.string().min(1),
  image: z.string().optional(),
  certificateNumber: z.string().optional(),
  length: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(['badge', 'certificate', 'course']),
  showOnResume: z.boolean(),
  resumeTitle: z.string().optional(),
  resumeSub: z.string().optional(),
});

const CareerMasterSchema = z.object({
  personal: PersonalSchema,
  experiences: z.array(ExperienceEntrySchema),
  cvTimeline: z.array(CvTimelineEntrySchema),
  skills: SkillsSchema,
  projects: z.array(ProjectEntrySchema),
  education: EducationSchema,
  certifications: z.array(CertificationSchema),
});

function sync() {
  console.log('🔄 Loading master career data source...');

  if (!fs.existsSync(MASTER_FILE)) {
    console.error(`❌ Master career file not found at: ${MASTER_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(MASTER_FILE, 'utf8');
  let masterData;

  try {
    masterData = JSON.parse(rawData);
  } catch (err: any) {
    console.error(`❌ Failed to parse career.json: ${err.message}`);
    process.exit(1);
  }

  // --- Validate master schema ---
  const result = CareerMasterSchema.safeParse(masterData);
  if (!result.success) {
    console.error('❌ Validation failed! Schema validation errors:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  console.log('✅ Master data schema is valid.');

  // --- Derive sub-outputs ---

  // 1. badges.json
  const badges = masterData.certifications
    .filter((c: any) => c.type === 'badge')
    .map((c: any) => ({
      title: c.title,
      image: c.image || '',
      url: c.url,
      authority: c.authority,
      description: c.description || '',
    }));

  // 2. certs.json
  const certs = masterData.certifications
    .filter((c: any) => c.type === 'certificate')
    .map((c: any) => ({
      title: c.title,
      image: c.image || '',
      url: c.url,
      authority: c.authority,
      completed: c.completedDate,
      description: c.description || '',
    }));

  // 3. courses.json
  const courses = masterData.certifications
    .filter((c: any) => c.type === 'course')
    .map((c: any) => ({
      course: c.title,
      url: c.url,
      completed: c.completedDate,
      authority: c.authority,
      certificateNumber: c.certificateNumber || undefined,
      length: c.length || null,
      category: c.category || '',
    }));

  // Write files
  fs.writeFileSync(path.join(DATA_DIR, 'badges.json'), JSON.stringify(badges, null, 2) + '\n', 'utf8');
  console.log(`💾 Generated ${badges.length} badges in src/data/badges.json`);

  fs.writeFileSync(path.join(DATA_DIR, 'certs.json'), JSON.stringify(certs, null, 2) + '\n', 'utf8');
  console.log(`💾 Generated ${certs.length} certificates in src/data/certs.json`);

  fs.writeFileSync(path.join(DATA_DIR, 'courses.json'), JSON.stringify(courses, null, 2) + '\n', 'utf8');
  console.log(`💾 Generated ${courses.length} courses in src/data/courses.json`);

  console.log('🎉 Data synchronization completed successfully!');
}

sync();
