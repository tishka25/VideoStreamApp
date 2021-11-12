import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { RootNavigationParam, RootNavigationScreen, RootStackParamList } from './types';


export const navigationRef = createNavigationContainerRef<RootNavigationParam>()

export function navigate(name: RootNavigationScreen, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate<RootNavigationScreen>(name, params);
  }
}

export function push(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
}

export function reset(name: RootNavigationScreen){
    if(navigationRef.isReady()) {
        navigationRef.reset({ index: 0, routes: [{ name: name }] });
    }
}

export function goBack(){
  if(navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
