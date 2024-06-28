



const StudioPage = ({params} : {params: {studioId: string}}) => {
    return (
        <div>Studio Details {params.studioId}
      </div>
    );
}

export default StudioPage;

/*

export default function StudioPage() {
  return <h1>studio details</h1>;
}
  */