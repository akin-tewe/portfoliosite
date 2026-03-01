# Known Watcher Failure Modes

## Failure 1: PowerShell CLI Flag Parsing (MOST COMMON)

**Root cause:** Line 70 of `watch-tasks.ps1` passes the spec content inline:
```powershell
$rawOutput = claude -p $prompt ...
```

PowerShell expands `$prompt` and the entire string becomes CLI arguments. Any substring starting with a dash (`-`) that PowerShell encounters gets interpreted as a CLI flag for the `claude` command, not as content.

**Examples that broke:**
- Task 013: `-translate-x-1/2` → PowerShell error: `unknown option '-translate-x-1/2'`
- Task 020: `-50%` → PowerShell error: `unknown option '-50%'`

**What Cowork must do (spec writing rules):**
- NEVER write a line or code snippet starting with a bare dash followed by text
- Use alternatives: `calc(0px - 50%)` instead of `-50%`, spell out "negative 50 percent"
- Avoid Tailwind classes with leading dashes in code blocks (e.g., `-translate-x-1/2`). Instead describe: "add the Tailwind translate utility that shifts X by negative 50 percent"
- If a dash is unavoidable, ensure it is mid-line, never at a position PowerShell might tokenize as a flag

**Proper script fix (for the user):** Change the watcher to pipe content via stdin instead of `-p`:
```powershell
$prompt | claude --pipe --allowedTools ... --output-format stream-json --verbose
```
Or write the prompt to a temp file and use input redirection. This eliminates all parsing issues permanently.

## Failure 2: Stale Task Name Collision

**Root cause:** The watcher checks `$processed` (a hashtable of BaseName) against files in `done/`. If a task file has the same name as one already in done/, it is silently skipped.

**Example:** Task 003 ran (bad spec). I wrote a corrected task-003.md. The watcher skipped it because `task-003` was already in `$processed` from the done/ scan at startup.

**What Cowork must do:** Always increment the task number. Never reuse a task filename, even if the previous one was wrong.

## Failure 3: Claude Code "Already Done" Misidentification

**Root cause:** When a new spec describes changes that overlap with a previous task's spec (same file, similar changes), Claude Code may read the completed spec in `done/`, compare it to the current file state, and conclude the work is already done — even though the NEW spec has different requirements.

**Example:** Task 004 described changes to ContactMe.tsx. Claude Code found task-003 in done/ (which had already modified ContactMe.tsx), read the current file, and decided everything matched — ignoring the differences in task-004's spec.

**What Cowork must do:** Write specs that reference the CURRENT file state explicitly (copy the exact current line). Don't describe changes relative to the "original" state if a previous task already modified the file. Claude Code compares against what it reads, not what used to be there.

## Summary: Pre-Flight Checklist Before Writing Any Spec

1. Increment task number (check done/ for last used)
2. Grep the spec content for any line starting with `-` followed by text — reword it
3. If fixing a previous task's mistake, reference the CURRENT file state, not the original
4. Avoid bare negative values, negative Tailwind classes, or CLI-flag-like strings anywhere in the spec
