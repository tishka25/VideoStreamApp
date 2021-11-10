export type RootStackParamList = {
    Launcher: any,
    Login: any,
    HomeTabs: any,
    Player: {id: string, isLive: boolean},
    RecordingsForChannel: {cid: number | number}
}

export type RootTabParamList = {
    Main: any,
    Profile: any,
    Recordings: any,
}

export type RootNavigationScreen = keyof (RootStackParamList & RootTabParamList);
export type RootNavigationParam = RootStackParamList & RootTabParamList;