import React from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import ReactGallery from 'react-fine-uploader';
import { environment } from '@common/utils/environment';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: `${environment}/api/delete?`
        },
        request: {
            endpoint: `${environment}/api/upload`
        },
        retry: {
            enableAuto: true
        }
    }
});

const Gallery = (props: IGalleryProps) => {
    return <ReactGallery uploader={uploader} />;
}

interface IGalleryProps {

}

export default Gallery;