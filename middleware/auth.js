export default function ({
    store,
    route,
    redirect
}) {
    if (route.path == '/'){
        redirect('/login')
    }
    if (!store.state.authUser) {
        console.log('not connected');
        redirect('/login');
    }
    else {
        if (route.path == 'login'){
            redirect('/products')
        }
    }
}