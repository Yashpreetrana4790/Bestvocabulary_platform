/**
 * Normalize word-of-the-day history API rows to { date, word: { word, pronunciation? }, _id? }.
 * Handles several backend shapes and missing fields.
 */

export function normalizeWodHistoryEntry(raw) {
  if (!raw || typeof raw !== "object") return null;

  const date =
    raw.date ??
    raw.assignDate ??
    raw.day ??
    raw.forDate ??
    raw.scheduledDate ??
    (raw.createdAt && String(raw.createdAt));

  let word = raw.word;
  if (typeof word === "string") {
    word = { word, pronunciation: raw.pronunciation };
  }
  if (!word?.word && raw.wordText) {
    word = { word: raw.wordText, pronunciation: raw.pronunciation };
  }
  if (!word?.word && raw.term) {
    word = { word: raw.term, pronunciation: raw.pronunciation };
  }

  if (!date || !word?.word) return null;

  return {
    _id: raw._id || raw.id,
    date,
    word: {
      word: String(word.word).trim(),
      pronunciation: word.pronunciation || raw.pronunciation || "",
    },
  };
}

export function normalizeWodHistoryList(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(normalizeWodHistoryEntry).filter(Boolean);
}

/**
 * Ensure newest-first timeline includes today's WOD when API history omits it or is empty.
 */
export function mergeTodayIntoWodHistory(normalizedEntries, currentWord) {
  const list = [...normalizedEntries];
  const w = currentWord?.word;
  if (!w) return list;

  const today = new Date();
  const todayKey = toLocalDateKey(today);

  const wordPayload = {
    word: String(w).trim(),
    pronunciation: currentWord.pronunciation || "",
  };

  const hasToday = list.some((e) => e?.date && toLocalDateKey(new Date(e.date)) === todayKey);
  if (!hasToday) {
    list.unshift({
      _id: "wod-today-local",
      date: today.toISOString(),
      word: wordPayload,
    });
  }

  return list;
}

function toLocalDateKey(d) {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
