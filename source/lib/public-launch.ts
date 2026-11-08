type LaunchEnv=Record<string,string|undefined>;
export function publicLaunchReady(env:LaunchEnv=process.env){return env.PUBLIC_LAUNCH==='true'}
