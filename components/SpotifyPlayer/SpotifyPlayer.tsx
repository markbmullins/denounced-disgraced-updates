import React from "react";
import {useWindowSize} from "../../utils/hooks/useWindowSize";

export const SpotifyPlayer = () => {
    const {width} = useWindowSize()
    const max = 450
    return (
        <>
            <iframe
                style={{borderRadius: "12px"}}
                src="https://open.spotify.com/embed/playlist/4WfemMhwoMW7nKEAnJ2TFN?utm_source=generator&theme=0"
                width={width < max ? width - 30 : max}
                height={width < max ? 370 : max}
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </>
    );
};

export const SpotifyPlayerLarge = () => {
    const {width} = useWindowSize()
    const max = 600

    return (
        <>
            <iframe
                style={{borderRadius: "12px"}}
                src="https://open.spotify.com/embed/playlist/4WfemMhwoMW7nKEAnJ2TFN?utm_source=generator&theme=0"
                width={width < max ? width - 30 : max}
                height={width < max ? 400 : max}
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </>
    );
};
