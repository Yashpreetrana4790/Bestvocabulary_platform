/**
 * Normalizes Word API payloads for the learner app.
 * Backend may return legacy snake_case or newer camelCase (Mongoose aliases).
 */

export function sentenceText(item) {
  if (item == null) return '';
  if (typeof item === 'string') return item.trim();
  if (typeof item === 'object' && typeof item.text === 'string') return item.text.trim();
  return '';
}

/** Example lines for a meaning: supports string[] or { text }[] */
export function getExampleSentenceStrings(meaning) {
  const raw = meaning?.exampleSentences ?? meaning?.example_sentences ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map(sentenceText).filter(Boolean);
}

export function getCommonUsage(meaning) {
  const u = meaning?.commonUsage ?? meaning?.common_usage ?? [];
  return Array.isArray(u) ? u : [];
}

export function getKidDefinition(meaning) {
  return meaning?.kidDefinition ?? meaning?.kiddefinition ?? '';
}

export function getPhrasalVerbs(word) {
  if (!word) return [];
  const list = word.phrasalVerbs ?? word.PhrasalVerbs ?? [];
  return Array.isArray(list) ? list : [];
}

export function getWordFamily(word) {
  return word?.wordFamily ?? word?.word_family ?? null;
}

export function getUsageDistribution(word) {
  return word?.usageDistribution ?? word?.usage_distribution ?? null;
}

export function getHistoricalUsage(word) {
  return word?.historicalUsage ?? word?.historical_usage ?? '';
}

export function getRootAnalysis(word) {
  return word?.rootAnalysis ?? word?.root_analysis ?? null;
}

/** Collocation: string (legacy) or { phrase, ... } */
export function collocationLabel(col) {
  if (col == null) return '';
  if (typeof col === 'string') return col;
  if (typeof col === 'object' && col.phrase) return String(col.phrase);
  return '';
}

export function phrasalFirstExample(pv) {
  const ex = pv?.example_sentences ?? pv?.exampleSentences;
  if (!Array.isArray(ex) || ex.length === 0) return '';
  return sentenceText(ex[0]);
}
