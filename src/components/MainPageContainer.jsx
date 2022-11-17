export default function MainPageContainer(props) {
    return (
        <div className='min-h-[100vh] flex justify-center flex-col w-full h-full items-center gap-4'>
            {props.children}
        </div>
    )
}
