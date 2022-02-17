# Class: SoundCloud

## Implements

- `SCEngine`

## Table of contents

### Constructors

- [constructor](../wiki/SoundCloud#constructor)

### Properties

- [extractor](../wiki/SoundCloud#extractor)
- [validator](../wiki/SoundCloud#validator)

### Methods

- [use](../wiki/SoundCloud#use)

## Constructors

### constructor

• **new SoundCloud**()

## Properties

### extractor

• **extractor**: (`input`: `string`) => `SCExtractorResult`

#### Type declaration

▸ (`input`): `SCExtractorResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

##### Returns

`SCExtractorResult`

#### Implementation of

SCEngine.extractor

___

### validator

• **validator**: (`input`: `string`) => `boolean`

#### Type declaration

▸ (`input`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

##### Returns

`boolean`

#### Implementation of

SCEngine.validator

## Methods

### use

▸ **use**(`input`, `type?`): `Promise`<`SoundCloudTrack` \| `SoundCloudArtist` \| `SoundCloudPlaylist` \| (`SoundCloudTrack` \| `SoundCloudArtist` \| `SoundCloudPlaylist`)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
| `type` | ``"all"`` \| ``"artist"`` \| ``"track"`` \| ``"playlist"`` | `'all'` |

#### Returns

`Promise`<`SoundCloudTrack` \| `SoundCloudArtist` \| `SoundCloudPlaylist` \| (`SoundCloudTrack` \| `SoundCloudArtist` \| `SoundCloudPlaylist`)[]\>

#### Implementation of

SCEngine.use
