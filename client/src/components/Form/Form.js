import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Typography, Paper } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux';

const Form = ({ currentId,setCurrentId}) => {

    // const [postData,setPostData] = useState({
    //     creator:'', title:'', message:'', tags:'', selectedFile:''
    // })
    const user = JSON.parse(localStorage.getItem('profile'));
    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')
    const [tags,setTags] = useState('')
    const [selectedFile,setSelectedFile] = useState('')

    const dispatch = useDispatch();
    const classes = useStyles();

    const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id === currentId ) : null );

    useEffect(() =>{
        if (post) {
            setTitle(post.title);
            setMessage(post.message);
            setTags(post.tags);
            setSelectedFile(post.selectedFile);
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();

        handleUpload(selectedFile);

        clear();

    }
    const clear = () => {
        setCurrentId(null);
        setTitle('');
        setMessage('');
        setTags('');
        setSelectedFile('');
    }
    const zoom = () => {

    }

    const handleUpload = async (image) => {
        const data = new FormData();
        data.append('file',image);
        data.append('upload_preset','chatApp');
        data.append('cloud_name','dfasplbkw');
        if(currentId) {
            dispatch(updatePost( post._id,{
                name: user?.result?.name,
                title: title,
                message: message,
                tags: tags,
                selectedFile: post.selectedFile
            }))
        }
        else{
            await fetch("https://api.cloudinary.com/v1_1/dfasplbkw/image/upload",{
                method: 'POST',
                body: data
            }).then(res=>res.json())
            .then(data=>{
                    dispatch(createPost({
                        name: user?.result?.name,
                        title: title,
                        message: message,
                        tags: tags,
                        selectedFile: data.url
                    }));
            })
        }
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper
            className={classes.paper}
        >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Creating'} a memory
                </Typography>
                <TextField  name="title"  label="Title" fullWidth value = {title} onChange = {(e) => setTitle( e.target.value )}/>
                <TextField  name="message"  label="Message" fullWidth value = {message} onChange = {(e) => setMessage( e.target.value )}/>
                <TextField  name="tags"  label="Tags" fullWidth value = {tags} onChange = {(e) => setTags( e.target.value.split(',') )}/>
                <Button variant="contained" component="label"  value={selectedFile} onChange = {(e) => setSelectedFile( e.target.files[0] )} >
                    Upload File
                    <input type="file" hidden/>
                </Button>
                {selectedFile && (
                    <img src={ currentId ? post.selectedFile : URL.createObjectURL(selectedFile)} alt="" height="50" width="50" onClickCapture={zoom} />
                )}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button  variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
