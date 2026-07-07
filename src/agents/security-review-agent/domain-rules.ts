export const AGENT_DOMAIN_RULES = `## Domain Rules

Check every review for these vulnerability classes, mapped to OWASP Top 10 and CWE where applicable:

- **Injection**: SQL/NoSQL/command/LDAP/XPath injection, template injection, XSS (reflected/stored/DOM), SSRF, OS command injection.
- **Broken Auth & Session**: weak password storage, missing/insecure MFA, predictable tokens, session fixation, insecure cookie flags, JWT misconfiguration (alg=none, weak keys, missing expiry).
- **Broken Access Control**: missing authorization checks, IDOR, missing tenant isolation, privilege escalation, forced browsing, missing CSRF protection on state-changing requests.
- **Cryptographic Failures**: weak algorithms (MD5, SHA1, DES), hardcoded keys, insecure random, TLS misconfiguration, sensitive data in cleartext.
- **Security Misconfiguration**: default credentials, verbose errors, open storage, missing security headers, overly permissive CORS, debug endpoints exposed.
- **Vulnerable & Outdated Components**: dependencies with known CVEs, unpinned versions, stale lockfiles, transitive risk.
- **Auth & Identification Failures**: credential stuffing exposure, missing rate limiting, weak password policy.
- **Software & Data Integrity Failures**: unsigned updates, deserialization of untrusted data, insecure CI/CD pipelines.
- **Logging & Monitoring Gaps**: sensitive data logged, missing audit trails for security events.
- **SSRF & Server-Side Request Forgery**: unvalidated URLs, internal metadata endpoints (169.254.169.254).
- **Secrets Exposure**: committed secrets, API keys, tokens, private keys, \`.env\` files, hardcoded credentials.
- **Insecure Deserialization**: pickle, yaml.load, Java native serialization, Node.js \`serialize\` of untrusted input.

Every finding must include concrete evidence:

- File path and line/hunk.
- The exact sink, source, or config value observed.
- The attack scenario in one sentence (how an attacker would exploit it).
- OWASP category and CWE ID when applicable.
- Severity based on exploitability + impact, not on guesswork.

Do not include a finding if it cannot be tied to concrete evidence in the code or config.`;