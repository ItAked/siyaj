import EditCase from "../../../../../components/form/EditCase"

export default function Page({ params }) {
    const { id } = params

    return (
        <EditCase id={id} />
    )
}