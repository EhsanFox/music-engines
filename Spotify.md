# Class: Spotify

## Implements

- `SPEngine`

## Table of contents

### Constructors

- [constructor](../wiki/Spotify#constructor)

### Properties

- [extractor](../wiki/Spotify#extractor)
- [validator](../wiki/Spotify#validator)

### Methods

- [use](../wiki/Spotify#use)

## Constructors

### constructor

• **new Spotify**()

## Properties

### extractor

• **extractor**: (`input`: `string`) => `SPExtractorResult`

#### Type declaration

▸ (`input`): `SPExtractorResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

##### Returns

`SPExtractorResult`

#### Implementation of

SPEngine.extractor

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

SPEngine.validator

## Methods

### use

▸ **use**(`input`): `Promise`<`YouTubeTrack` \| `SpotifyTrack` \| `SpotifyAlbum` \| `SpotifyPlaylist` \| `SpotifyArtist` \| `YouTubeTrack`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`Promise`<`YouTubeTrack` \| `SpotifyTrack` \| `SpotifyAlbum` \| `SpotifyPlaylist` \| `SpotifyArtist` \| `YouTubeTrack`[]\>

#### Implementation of

SPEngine.use
