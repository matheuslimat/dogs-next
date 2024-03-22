export default async function FeedPhotos({photos} : {photos: any}) {
    console.log(photos)
    return (
        <div>
            <h1>Feed</h1>
            <ul>
                {photos.map(photo => <li>{photo.title}</li>)}
            </ul>
        </div>
    );
}