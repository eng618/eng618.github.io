---
name: skill-creator
description: A meta-skill to guide the creation of new agent skills
---

# Skill Creator

Use this skill when you need to create a new agent skill.

## Required Structure

Each skill must be a directory in `.agent/skills/` containing at least a `SKILL.md` file.

## SKILL.md Format

The `SKILL.md` file MUST start with YAML frontmatter:

```yaml
---
name: skill-name
description: a brief description of what the skill does
---
```

## Guidance

1. **Focused Scope**: Each skill should have a clear, specific purpose.
2. **Actionable Instructions**: Provide clear steps or rules for the agent to follow.
3. **Resources**: If the skill requires helper scripts, place them in a `scripts/` subdirectory within the skill folder.
