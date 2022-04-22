import { checkMultiple, requestMultiple } from 'react-native-permissions';

export const checkMultiplePermission = async permission => {
  const response = await checkMultiple(permission);
  return response;
};

export function multipleRequest(permission) {
  const response = requestMultiple(permission);
  return response;
}
