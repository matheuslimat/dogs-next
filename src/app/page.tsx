import Feed from "@/components/feed/feed";

export default async function Home() {
  const response = await fetch('https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0')
  const data = await response.json()
  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
