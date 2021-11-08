import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef<any>()

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function push(name: string, params: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
}
