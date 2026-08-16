# Website Analytics & Instrumentation Reference

This document provides a comprehensive reference of all analytics tracking, instrumentation points, custom event schemas, and privacy-compliance measures implemented across the website.

---

## 1. Core Analytics Engine

The site uses **OpenPanel** as its privacy-first, cookieless analytics engine via an analytics abstraction (`src/lib/analytics.ts`).

- **Unified Layer**: `src/lib/analytics.ts` (`trackEvent`) dispatches custom metrics, user interactions, and Web Vitals to OpenPanel while suppressing telemetry in `localhost`.
- **OpenPanel**: Integrated via `@openpanel/nextjs` (`src/components/openpanel-provider.tsx`), configured with `NEXT_PUBLIC_OPENPANEL_CLIENT_ID`, `NEXT_PUBLIC_OPENPANEL_API_URL`, and `NEXT_PUBLIC_OPENPANEL_SCRIPT_URL`.
- **Automatic Instrumentation**: Screen views, outgoing links, element data-attributes, and hash changes are tracked automatically.
- **Privacy & Anonymization**: No cookies or personal identifiable information (PII) are collected.

---

## 2. Lead Generation & Contact Form

| Event Name               | Trigger Context                                     | Custom Properties                                        | Purpose                                                       |
| :----------------------- | :-------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------ |
| `Contact Form Started`   | User focuses on any form field for the first time.  | _None_                                                   | Measures contact form initiation and bounce/abandonment rate. |
| `Contact Form Submitted` | User submits the form.                              | `subject_length` (Number)<br />`message_length` (Number) | Measures submission volume and message depth.                 |
| `Contact Form Success`   | Formspree backend returns HTTP 200 / success.       | _None_                                                   | Core conversion goal for recruiter and client outreach.       |
| `Contact Form Error`     | Formspree returns an API error or validation issue. | `error_count` (Number)                                   | Captures form delivery failures or service degradations.      |

---

## 3. Recruiter Tailoring & Cover Letters

| Event Name                  | Trigger Context                                                               | Custom Properties                                                                               | Purpose                                                                    |
| :-------------------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `Cover Letter View`         | Recipient loads their tailored cover letter route (`/cover-letter?slug=...`). | `slug` (String)<br />`company` (String)<br />`role_title` (String)<br />`has_subject` (Boolean) | Confirms recruiter/hiring manager engagement with tailored submissions.    |
| `Cover Letter Print`        | User clicks "Print cover letter".                                             | `slug` (String)                                                                                 | Indicates high-intent review (saving/printing to PDF for team discussion). |
| `Cover Letter Resume Click` | User clicks "View resume" from within their tailored letter.                  | `slug` (String)                                                                                 | Measures transition rate from pitch to comprehensive career history.       |
| `Cover Letter Error`        | Invalid slug or database retrieval failure on `/cover-letter`.                | `slug` (String)<br />`reason` ("database_error" \| "not_found")                                 | Alerts to broken or mistyped links sent in applications.                   |

---

## 4. Knowledge Base, Code Snippets & Documentation

| Event Name             | Trigger Context                                                 | Custom Properties                                                            | Purpose                                                               |
| :--------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `Code Snippet Copied`  | User clicks the copy button on a code block in technical notes. | `char_count` (Number)<br />`line_count` (Number)<br />`pathname` (String)    | Identifies highest-utility technical notes and documentation.         |
| `Notes Search`         | User searches documentation notes (debounced $\ge 2$ chars).    | `query_term` (String)<br />`query_length` (Number)<br />`base_path` (String) | Reveals high-demand topics, missing documentation, or search intent.  |
| `Edit on GitHub Click` | User clicks "Edit this page on GitHub".                         | `relative_path` (String)                                                     | Tracks community contribution and open-source documentation interest. |

---

## 5. Credentials & Portfolio Engagement

| Event Name                         | Trigger Context                                                        | Custom Properties                                                                     | Purpose                                                                          |
| :--------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| `Credential Lightbox Opened`       | User clicks on a badge or certificate to view its details.             | `title` (String)<br />`authority` (String)<br />`type` (String)                       | Evaluates interest in specific certifications (e.g. AWS, Meta, DeepLearning.AI). |
| `Credential External Verify Click` | User clicks "Verify Credential" or "Open PDF Certificate" in lightbox. | `title` (String)<br />`authority` (String)<br />`action` ("verify_url" \| "open_pdf") | Measures third-party proof-of-competence verification clicks.                    |
| `Hero CTA Click`                   | User clicks a primary CTA button on the homepage hero.                 | `target` ("portfolio" \| "contact" \| "resume")                                       | Measures primary funnel routing from initial landing.                            |
| `Footer Social Click`              | User clicks social icons in the footer.                                | `platform` (String)<br />`label` (String)                                             | Tracks outbound discovery to GitHub, LinkedIn, and X.                            |

---

## 6. Interactive Easter Egg: Linter Invaders

Analytics in the 404 game measure user engagement, CTR, gameplay completion, and score milestones.

### Event Schema

| Event Name              | Trigger Context                                                  | Custom Properties                                                                                         | Purpose                                                                |
| :---------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `404 Page View`         | Page mount on `_not-found` route.                                | `referrer` (String)<br />`broken_url` (String: `window.location.pathname`)                                | Analyzes referral paths and maps popular broken links.                 |
| `Game Launch`           | Initial debugger protocol activation.                            | `trigger` ("spacebar" or "click")                                                                         | Measures CTR conversion into the game.                                 |
| `First Shot`            | User fires their first semicolon projectile.                     | `trigger` ("spacebar" or "click")                                                                         | Confirms active player participation.                                  |
| `Clean Build Milestone` | User score reaches $\ge 100$ in a single run.                    | `score` (Number)<br />`high_score` (Number)                                                               | Custom Goal conversion indicating high-level user engagement.          |
| `Game Over`             | Colliding with an enemy or letting one pass the bottom boundary. | `score` (Number)<br />`high_score` (Number)<br />`duration_seconds` (Number)<br />`reboot_count` (Number) | Captures retention, game length, and session progression.              |
| `Game Reboot`           | Resetting after a Game Over crash.                               | `trigger` ("enter" or "click")                                                                            | Measures session stickiness and replay value.                          |
| `404 Exit`              | Direct navigation link click from the 404 layout.                | `destination` ("home" \| "projects" \| "contact")<br />`played_game` ("true" \| "false")                  | Measures if the game helps keep users on the site (bounce prevention). |

---

## 7. Resume & CV Page Tracking

| Event Name             | Trigger Context                                   | Custom Properties                                                                   | Purpose                                            |
| :--------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------- |
| `Resume Tab Toggle`    | Switching between Resume and CV layout.           | `selected_tab` ("resume" or "cv")                                                   | Evaluates section view preferences.                |
| `Resume Print`         | Clicking "Print Resume" or "Print CV".            | `document_type` ("resume" or "cv")                                                  | Primary recruiter target conversion tracking.      |
| `Resume Contact Click` | Clicking direct email, GitHub, or LinkedIn icons. | `channel` ("email" \| "website" \| "github" \| "linkedin")<br />`link_url` (String) | Measures outbound recruitment conversion channels. |

---

## 8. Admin Control Panel Tracking (Security & Workspace Telemetry)

| Event Name                       | Trigger Context                                                       | Custom Properties                                                           | Purpose / Security Coverage                                                  |
| :------------------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `Admin Auth Success`             | User enters correct admin credentials and loads workspace.            | `email_domain` (String: domain only)                                        | Baselines normal administrator session hours, patterns, and devices.         |
| `Admin Access Denied`            | User completes magic link login but their email is unauthorized.      | `attempted_email_domain` (String)                                           | Detects **Privilege Escalation** attempts and potential unauthorized actors. |
| `Admin Auth Failed`              | Database or Supabase authentication token returns an error.           | `error_code` (String)<br />`attempted_email_domain` (String)                | Identifies **Credential Abuse** or scan sweeps.                              |
| `Admin Magic Link Requested`     | Magic link trigger requested by email.                                | `attempted_email_domain` (String)                                           | Monitors authentication volume to detect request spamming.                   |
| `Admin Suspicious Activity`      | Spammed actions (e.g. >5 magic link requests/min) or query anomalies. | `attempts_count` (Number)<br />`anomaly_type` ("rate_limit_bypass_attempt") | Captures client-side **Bruteforce / Spamming** patterns.                     |
| `Admin Cover Letter Saved`       | Administrator creates or updates a tailored cover letter.             | `is_new` (Boolean)<br />`has_company` (Boolean)<br />`status` (String)      | Measures application volume and pipeline tracking.                           |
| `Admin Cover Letter Link Copied` | Administrator copies the secret recipient share link.                 | `slug` (String)                                                             | Tracks outreach generation activity.                                         |
| `Admin Cover Letter Deleted`     | Administrator deletes a cover letter.                                 | `id` (String)                                                               | Audits data deletion lifecycle.                                              |
| `Admin Template Applied`         | Administrator applies a boilerplate or custom template.               | `template` (String)                                                         | Evaluates template effectiveness and adoption.                               |
| `Admin Private Note Saved`       | Administrator saves or updates a private note.                        | `is_new` (Boolean)<br />`category` (String)<br />`tag_count` (Number)       | Tracks knowledge management productivity.                                    |
| `Admin Private Note Pin Toggled` | Administrator pins/unpins a note.                                     | `pinned` (Boolean)                                                          | Tracks note organization preferences.                                        |
| `Admin Private Note Exported`    | Administrator exports a private note as Markdown.                     | `category` (String)                                                         | Tracks data extraction and offline workflows.                                |

---

## 9. Success Metric Formulations

- **Contact Form Conversion Rate**:  
  `Contact Conversion = (Contact Form Success / Contact Form Started) * 100`
- **Tailored Letter Engagement Rate**:  
  `Letter Print Rate = (Cover Letter Print Events / Total Cover Letter Views) * 100`
- **Documentation Utility Rate**:  
  `Snippet Copy Rate = (Code Snippet Copied / Total Notes Page Views) * 100`
- **Game Conversion Rate**:  
  `Game CTR = (Game Launch Events / Total 404 Page Views) * 100`
- **Outreach Rate**:  
  `Outreach Conversion = ((Resume Contact Clicks + Resume Prints) / Total Resume Page Views) * 100`
