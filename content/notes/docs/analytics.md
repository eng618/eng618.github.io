# Website Analytics & Instrumentation Reference

This document provides a comprehensive reference of all analytics tracking, instrumentation points, custom event schemas, and privacy-compliance measures implemented across the website.

---

## 1. Core Analytics Engine

The site uses **OpenPanel** as its privacy-first, cookieless analytics engine via an analytics abstraction (`src/lib/analytics.ts`).

- **Unified Layer**: `src/lib/analytics.ts` (`trackEvent`) dispatches custom metrics, user interactions, and Web Vitals to OpenPanel while suppressing telemetry in `localhost`.
- **OpenPanel**: Integrated via `@openpanel/nextjs` (`src/components/openpanel-provider.tsx`), configured with `NEXT_PUBLIC_OPENPANEL_CLIENT_ID`, `NEXT_PUBLIC_OPENPANEL_API_URL`, and `NEXT_PUBLIC_OPENPANEL_SCRIPT_URL`.
- **Privacy & Anonymization**: No cookies or personal data are collected or tracked across sites.

---

## 2. Interactive Easter Egg: Linter Invaders

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

## 3. Resume & CV Page Tracking

Engagement logs on `/resume` track outbound CTA conversion and detail document view toggling.

### Event Schema

| Event Name             | Trigger Context                                   | Custom Properties                                                                   | Purpose                                            |
| :--------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------- |
| `Resume Tab Toggle`    | Switching between Resume and CV layout.           | `selected_tab` ("resume" or "cv")                                                   | Evaluates section view preferences.                |
| `Resume Print`         | Clicking "Print Resume" or "Print CV".            | `document_type` ("resume" or "cv")                                                  | Primary recruiter target conversion tracking.      |
| `Resume Contact Click` | Clicking direct email, GitHub, or LinkedIn icons. | `channel` ("email" \| "website" \| "github" \| "linkedin")<br />`link_url` (String) | Measures outbound recruitment conversion channels. |

---

## 4. Admin Control Panel Tracking (Security Telemetry)

Because the admin page enables writing cover letters and reading private database content, telemetry logs focus heavily on threat detection, unauthorized entry modeling, and session monitoring.

### Event Schema

| Event Name                   | Trigger Context                                                       | Custom Properties                                                           | Purpose / Security Coverage                                                  |
| :--------------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `Admin Auth Success`         | User enters correct admin credentials and loads workspace.            | `email_domain` (String: domain only)                                        | Baselines normal administrator session hours, patterns, and devices.         |
| `Admin Access Denied`        | User completes magic link login but their email is unauthorized.      | `attempted_email_domain` (String)                                           | Detects **Privilege Escalation** attempts and potential unauthorized actors. |
| `Admin Auth Failed`          | Database or Supabase authentication token returns an error.           | `error_code` (String)<br />`attempted_email_domain` (String)                | Identifies **Credential Abuse** or scan sweeps.                              |
| `Admin Magic Link Requested` | Magic link trigger requested by email.                                | `attempted_email_domain` (String)                                           | Monitors authentication volume to detect request spamming.                   |
| `Admin Suspicious Activity`  | Spammed actions (e.g. >5 magic link requests/min) or query anomalies. | `attempts_count` (Number)<br />`anomaly_type` ("rate_limit_bypass_attempt") | Captures client-side **Bruteforce / Spamming** patterns.                     |

_Note: Strict database write authorizations (`INSERT`, `UPDATE`, `DELETE` events) and session User-Agent changes (session drift / hijacking attempts) are logged secure-side via Server Middleware and Supabase audit triggers rather than public client-side telemetry to protect private infrastructure._

---

## 5. Success Metric Formulations

Using the above telemetry, standard metrics are computed as follows:

- **Game Conversion Rate**:  
  `CTR = (Game Launch Events / Total 404 Page Views) * 100`
- **Outreach Rate**:  
  `Outreach Conversion = ((Resume Contact Clicks + Resume Prints) / Total Resume Page Views) * 100`
- **Admin Threat Indicator (Bruteforce Spike)**:  
  `Failed Attempt Frequency = Count(Admin Auth Failed) > 10 per 5 minutes`
