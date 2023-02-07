import { deficiencyOptions } from 'constants/constants';
import { Name } from 'features/distributionDetails/distributionDetailsTypes';

export const formatName = (name: Name) => {
  return `${name.lastName} ${name.firstName}`;
};

export function formatTypes(enumString: string): string {
  if (enumString) {
    return enumString.charAt(0) + enumString.slice(1).toLowerCase();
  }
  return enumString;
}

export const base64toBlob = (data: string, mimeType: string) => {
  const bytes = atob(data);
  let length = bytes.length;
  const out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: mimeType });
};

/**
 * Convert a snake-case ENUM value (e.g. "TAX_RESIDENCE, DOMICILE") to sentence case ("Tax residence, Domicile")
 * @param enumString the enum to convert
 */
export function formatEnum(enumString: string): string {
  return enumString
    ? enumString.charAt(0) +
        enumString
          .slice(1)
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/,\s*([a-z])/g, function (d, e) {
            return ', ' + e.toUpperCase();
          })
    : enumString;
}

export const translateDeficiencies = (deficiency: string) => {
  const deficiencyToTranslate = deficiencyOptions.find(
    (deficiencyOption) => deficiencyOption.value === deficiency
  )?.label;

  return deficiencyToTranslate ?? deficiency;
};
