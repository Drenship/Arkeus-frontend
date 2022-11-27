interface Image {
    asset: {
        url: String
    }
}

export interface Creator {
    _id: String,
    name: String,
    address: String,
    slug: {
        current: String,
    },
    image: Image,
    bio: String,
}

export interface Collection {
    _id: String,
    title: String,
    description: String,
    nftCollectionName: String,
    address: String,
    slug: {
        current: String,
    },
    creator: Creator,
    mainImage: Image,
    preview: Image,
}
