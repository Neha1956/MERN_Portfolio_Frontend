const parseJsonArray = (value) => {
  if (typeof value !== "string" || !value.trim().startsWith("[")) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const normalizeSkills = (value) => {
  if (Array.isArray(value)) {
    const parsed = parseJsonArray(value.join(","));
    const values = parsed || value;
    return values
      .flatMap((skill) => normalizeSkills(skill))
      .filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  const parsed = parseJsonArray(value);
  if (parsed) {
    return normalizeSkills(parsed);
  }

  return value
    .split(",")
    .map((skill) => skill.trim().replace(/^[\s"'[\]]+|[\s"'[\]]+$/g, ""))
    .filter(Boolean);
};

export default normalizeSkills;
