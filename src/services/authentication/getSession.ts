import resources from '../../resources/resources'
export default async function getSession(){
    const supabase=resources.config.supabaseClient
    await supabase.auth.getSession()
}