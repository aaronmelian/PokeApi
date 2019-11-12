import React from 'react';
import './Loading.module.css'

const Loading = () => {

        window.scrollTo(0, 0)

        return (
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            )
}

export default Loading;