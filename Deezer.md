# Class: Deezer

## Implements

- `DZEngine`

## Table of contents

### Constructors

- [constructor](../wiki/Deezer#constructor)

### Properties

- [extractor](../wiki/Deezer#extractor)
- [validator](../wiki/Deezer#validator)

### Methods

- [use](../wiki/Deezer#use)

## Constructors

### constructor

• **new Deezer**()

## Properties

### extractor

• **extractor**: (`input`: `string`) => `DZExtractorResult`

#### Type declaration

▸ (`input`): `DZExtractorResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

##### Returns

`DZExtractorResult`

#### Implementation of

DZEngine.extractor

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

DZEngine.validator

## Methods

### use

▸ **use**(`input`, `type?`): `Promise`<`DeezerTrack` \| `DeezerAlbum` \| `DeezerArtist` \| `DeezerPlaylist` \| (`DeezerTrack` \| `DeezerAlbum` \| `DeezerArtist` \| `DeezerPlaylist`)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
| `type` | ``"artist"`` \| ``"track"`` \| ``"playlist"`` \| ``"album"`` | `"track"` |

#### Returns

`Promise`<`DeezerTrack` \| `DeezerAlbum` \| `DeezerArtist` \| `DeezerPlaylist` \| (`DeezerTrack` \| `DeezerAlbum` \| `DeezerArtist` \| `DeezerPlaylist`)[]\>

#### Implementation of

DZEngine.use
