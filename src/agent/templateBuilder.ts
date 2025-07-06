export function renderTemplate(template: string, variables: Record<string, string | number>) {
  return template.replace(/\$\{(.*?)\}/g, (_, key) => {
    return variables[key.trim()]?.toString() || '';
  });
}
