import Link from "next/link";

export const BtnAnimal = ({ name, src }: { name: string; src: string }) => {
  return (
    <div className="btn_animal">
      <Link href={`/animals?name=${name}`}>
        <img src={src} alt={name} className="BtnAnimalImg"></img>
      </Link>
      <h2 className="name_animal">{name}</h2>
    </div>
  );
};
