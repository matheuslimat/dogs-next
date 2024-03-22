import FeedPhotos from "./feed-photos";

export default async function Feed({photos} : {photos: any}) {
    return (
        <div>
            <FeedPhotos photos={photos} />
        </div>
    );
}