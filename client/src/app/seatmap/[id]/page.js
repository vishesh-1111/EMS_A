"use client"
import SeatMap from "../../../components/seatmap/page";
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import PageLoader from "../../../components/PageLoader";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export default function RenderSeatMap(){
    const {id} = useParams();

    const { data, isLoading, isError } = useQuery({
      queryKey: ['seats'], 
      queryFn: async () => {
        console.log('fetching seatmap....');
        const response = await fetch(`${serverUrl}/seats/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        if (!response.ok) {
          throw new Error(`${response.message}`);
        }
        const res = await response.json();
        return res;
      },
      staleTime: 1000*10,
      refetchInterval:1000*5,
    });
  
    if (isLoading) {
      return <PageLoader />;
    }
      
     console.log(data.allseats);
    return(
       <div>
        <SeatMap data={data} id={id}/>
       </div>
    )
}