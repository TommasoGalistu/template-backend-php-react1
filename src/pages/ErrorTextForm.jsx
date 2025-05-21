function ErrorTextForm({children, typeText}){
    return <p className={typeText ? 'text-success': 'text-danger'}>
        {children ?? ''}
    </p>
}

export default ErrorTextForm;