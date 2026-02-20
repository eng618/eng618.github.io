import { spawn } from 'child_process';
import process from 'process';

const args = process.argv.slice(2);
const fix = args.includes('--fix');

const steps = [
  {
    name: 'Format',
    cmd: 'yarn',
    args: fix ? ['format'] : ['format:ci'],
  },
  {
    name: 'Lint',
    cmd: 'yarn',
    args: fix ? ['lint:fix'] : ['lint'],
  },
  {
    name: 'Type Check',
    cmd: 'yarn',
    args: ['tsc', '--noEmit'],
  },
  {
    name: 'Test',
    cmd: 'yarn',
    args: ['vitest', 'run'],
  },
  {
    name: 'Build',
    cmd: 'yarn',
    args: ['build'],
  },
];

async function runStep(step) {
  console.log(`\n🔹 Running ${step.name}...`);

  return new Promise((resolve, reject) => {
    const child = spawn(step.cmd, step.args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, CI: 'true' }, // Simulate CI environment
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${step.name} passed`);
        resolve();
      } else {
        console.error(`❌ ${step.name} failed with exit code ${code}`);
        reject(new Error(`${step.name} failed`));
      }
    });

    child.on('error', (err) => {
      console.error(`❌ ${step.name} failed to start: ${err.message}`);
      reject(err);
    });
  });
}

async function main() {
  console.log(`🚀 Starting validation ${fix ? '(with fix)' : ''}...`);

  try {
    for (const step of steps) {
      await runStep(step);
    }
    console.log('\n🎉 All checks passed successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error('\n💥 Validation failed.');
    process.exit(1);
  }
}

main();
