export type RootStackParamList = {
    Launcher: any,
    Login: any,
    HomeTabs: any,
    Player: {id: string} | undefined
}

export type RootTabParamList = {
    Main: any,
    Profile: any
}

export type RootNavigationScreen = keyof (RootStackParamList & RootTabParamList);
export type RootNavigationParam = RootStackParamList & RootTabParamList;