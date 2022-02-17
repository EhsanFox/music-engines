# Class: YouTube

## Implements

- `YTEngine`

## Table of contents

### Constructors

- [constructor](../wiki/YouTube#constructor)

### Properties

- [extractor](../wiki/YouTube#extractor)
- [validator](../wiki/YouTube#validator)

### Methods

- [use](../wiki/YouTube#use)

## Constructors

### constructor

• **new YouTube**()

## Properties

### extractor

• **extractor**: (`url`: `string`) => `YTExtractorResult`

#### Type declaration

▸ (`url`): `YTExtractorResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

##### Returns

`YTExtractorResult`

#### Implementation of

YTEngine.extractor

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

YTEngine.validator

## Methods

### use

▸ **use**(`input`, `opts?`): `Promise`<(`YouTubeTrack` \| `YouTubeArtist` \| `YouTubePlaylist` \| `Channel` \| `Video` \| `Playlist`)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |
| `opts` | `YTOptions` |

#### Returns

`Promise`<(`YouTubeTrack` \| `YouTubeArtist` \| `YouTubePlaylist` \| `Channel` \| `Video` \| `Playlist`)[]\>

#### Implementation of

YTEngine.use
