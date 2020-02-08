import * as React from 'react';
import CancelButton from 'react-fine-uploader/cancel-button';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Thumbnail from 'react-fine-uploader/thumbnail';
import Dropzone from 'react-fine-uploader/dropzone';
import FileInput from 'react-fine-uploader/file-input';
import PauseResumeButton from 'react-fine-uploader/pause-resume-button';
import ProgressBar from 'react-fine-uploader/progress-bar';
import Filesize from 'react-fine-uploader/filesize';
import Filename from 'react-fine-uploader/filename';
import RetryButton from 'react-fine-uploader/retry-button';
import Status from 'react-fine-uploader/status';
import DeleteButton from 'react-fine-uploader/delete-button';
import { environment } from '@common/utils/environment';
import { Row, Col } from 'antd';

import './index.less';

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

const isFileGone = (status: string) => {
    return [
        'canceled',
        'deleted',
    ].indexOf(status) >= 0;
};

class Combine extends React.Component<ICombineProps, ICombineState> {
    constructor(props: ICombineProps) {
        super(props);

        this.state = {
            submittedFiles: []
        }
    }


    componentDidMount() {
        const { submittedFiles } = this.state;
        uploader.on('statusChange', (id: string, oldStatus: string, newStatus: string) => {
            if (newStatus === 'submitted') {
                const files = submittedFiles;
                console.log("xjx id: ", id);
                files.push(id);
                this.setState({ submittedFiles: files });
            } else if (isFileGone(newStatus)) {
                const files = submittedFiles;
                const indexToRemove = submittedFiles.indexOf(id);

                files.splice(indexToRemove, 1);
                this.setState({ submittedFiles: files });
            }
        });
    }

    render() {
        const { submittedFiles } = this.state;

        return <div className='combine-page'>
            <FileInput multiple uploader={uploader}>
                <span className="icon ion-upload">Choose Files</span>
            </FileInput>
            <Dropzone style={{ border: '1px dotted', height: 200, width: 200 }}
                uploader={uploader}
            >
                <span>Drop Files Here</span>
            </Dropzone>
            <Row className='file-body'>
                {
                    submittedFiles.map(id => {
                        return <Col className='file-content' key={id}>
                            <DeleteButton
                                id={id}
                                uploader={uploader}
                            />
                            <Thumbnail
                                id={id}
                                uploader={uploader}
                            />
                            <CancelButton
                                id={id}
                                uploader={uploader}
                            />
                            <PauseResumeButton
                                id={id}
                                pauseChildren="暂停"
                                uploader={uploader} />
                            <ProgressBar
                                id={id}
                                uploader={uploader}
                            />
                            <RetryButton
                                id={id}
                                uploader={uploader}
                            />
                            <Filesize
                                id={id}
                                uploader={uploader}
                            />
                            <Filename
                                id={id}
                                uploader={uploader}
                            />
                            <Status
                                id={id}
                                uploader={uploader}
                            />
                        </Col>
                    })
                }
            </Row>
        </div>;;
    }
}


// const Combine = (props: ICombineProps) => {
//     const [submittedFiles, setSubmittedFiles] = useState<any[]>([]);
//     const refCombine = useRef(null);
//     let unmounted = false;

//     useEffect(() => {
//         onStatusChange();

//         return () => {
//             unmounted = true;
//         }
//     });

//     const onStatusChange = () => {

//         uploader.on('statusChange', (id: string, oldStatus: string, newStatus: string) => {
//             if (newStatus === 'submitted') {
//                 const files = submittedFiles;
//                 console.log("xjx id: ", id);
//                 files.push(id);
//                 if (!unmounted) {
//                     setSubmittedFiles(files);
//                 }
//             } else if (isFileGone(newStatus)) {
//                 const files = submittedFiles;
//                 const indexToRemove = submittedFiles.indexOf(id);

//                 files.splice(indexToRemove, 1);
//                 if (!unmounted) {
//                     setSubmittedFiles(files);
//                 }
//             }
//         });
//     }

//     console.log("submittedFiles: ", submittedFiles);

//     return <div ref={refCombine}>
//         <FileInput multiple accept='image/*' uploader={uploader}>
//             <span className="icon ion-upload">Choose Files</span>
//         </FileInput>
//         <Dropzone style={{ border: '1px dotted', height: 200, width: 200 }}
//             uploader={uploader}
//         >
//             <span>Drop Files Here</span>
//         </Dropzone>
//         {
//             submittedFiles.map(id => {
//                 return <div key={id}>
//                     <Thumbnail id={id} uploader={uploader} />
//                     <CancelButton id={id} uploader={uploader} />
//                 </div>
//             })
//         }
//     </div>;
// }

interface ICombineState {
    submittedFiles: string[];
}

interface ICombineProps {

}

export default Combine;