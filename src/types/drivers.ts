export type IDrivers = "spotify" | "youtube" | "soundcloud" | "deezer";

export interface ISearchOptionBase<TypeList, ReqOptsType> {
  type: TypeList;
  requestOptions: ReqOptsType;
}

export interface IDriverBase<
  ConfigType,
  TrackType,
  SearchTypeList,
  ReqOptsType
> {
  config: ConfigType;
  platform: IDrivers;
  search: (
    query: string,
    options: ISearchOptionBase<SearchTypeList, ReqOptsType>
  ) => Promise<TrackType | TrackType[]>;
  getById: (
    id: string | number,
    options: ISearchOptionBase<SearchTypeList, ReqOptsType>
  ) => Promise<TrackType>;
}
