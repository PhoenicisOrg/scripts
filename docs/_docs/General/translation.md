---
title: "Translation"
category: General
order: 3
toc: false
---

Travis ensures that the translation files are kept up-to-date.

However, the `.po` must be created once for a new language:
```bash
msginit -i i18n/keys.pot -o i18n/de.po
```
