import RootHappyClients from "@/components/HappyClients/RootHappyClients"
import SuspenseLoader from "@/components/shared/SuspenseLoader"
import { Suspense } from "react"


const page = () => {
    return (
        <div>
            <Suspense fallback={<SuspenseLoader />}>
                <RootHappyClients />
            </Suspense>
        </div>
    )
}

export default page