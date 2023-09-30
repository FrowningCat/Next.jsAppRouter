import { CustomMDX } from './components/CustomeMDXRemote';

export default function Home() {
    return (
        <CustomMDX
            source={`:::main{#readme}

Lorem:br
ipsum.

::hr{.red}

A :i[lovely] language know as :abbr[HTML]{title="HyperText Markup Language"}.

:::`}
        />
    );
}
