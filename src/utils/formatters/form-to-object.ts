const formToObject = <T>(formData: FormData, omit?: string[]): T => {
  const _object: T | Record<string, unknown> = {};
  for (const key of Array.from(formData.keys())) {
    if (!omit || !omit.includes(key)) {
      _object[key] = formData.get(key);
    }
  }

  return _object as T;
};

export default formToObject;
