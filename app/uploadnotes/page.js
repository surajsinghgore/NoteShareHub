"use client";
import { Toaster, toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

import style from "./uploadnotes.module.css";
import {
  faPenNib,
  faTrash,
  faPaperPlane,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClientLoginVerify from "@/middleware/ClientLoginVerify";
<FontAwesomeIcon icon="fa-solid fa-pen-nib" />;

export default function Page() {
  const [title, setTitle] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [description, setDescription] = useState([]);

  const [file, setFile] = useState([]);
  const [fileArr, setFileArr] = useState([]);

  // drag and drop function
  const handleChange = (file) => {
    setFile(file);
  };

  // file upload from button click
  const handleChanges = async (e) => {
    setFile(e.target.files);
  };

  const handleInput = (e, name) => {
    setTitle({ ...title, [name]: e.target.value });
  };
  const handleInputKeyword = (e, name) => {
    setKeyword({ ...keyword, [name]: e.target.value });
  };
  const handleInputVisibility = (e, name) => {
    setVisibility({ ...visibility, [name]: e.target.value });
  };
  const handleInputDescription = (e, name) => {
    setDescription({ ...description, [name]: e.target.value });
  };

  const deletePost = (name) => {
    let newArr = fileArr.filter((item) => {
      return item[1].name != name;
    });
    setFileArr(newArr);

    delete title[name];
    delete keyword[name];
    delete visibility[name];
    delete description[name];

    if (fileArr.length == 1) {
      setFile([]);
    }
  };
  useEffect(() => {
    if (file.length != 0) {
      setFileArr(Object.entries(file));
    }
  }, [file]);

  const postMedia = async () => {
    // ! [title field]
    // check weather title field is not empty
    if (Object.keys(title).length == 0) {
      toast.warning("Please Enter Title in Post 1");
      return;
    }
    //  getting values in title field
    let titleValueGets = Object.entries(title);

    // check weather all  title post must insert title

    if (titleValueGets.length != fileArr.length) {
      let newArray = Array.from(fileArr);

      for (let index = 0; index < titleValueGets.length; index++) {
        for (let i = 0; i <= fileArr.length; i++) {
          if (titleValueGets[index][0] == fileArr[i][1].name) {
            let newArr = await newArray.filter((item) => {
              return item[1].name != titleValueGets[index][0];
            });

            newArray = newArr;

            break;
          }
        }
      }

      if (newArray.length != 0) {
        for (let index = 0; index < fileArr.length; index++) {
          if (newArray[0][1].name == fileArr[index][1].name) {
            toast.warning(`Please Enter Title in Post ${++index}`);
            return;
          }
        }
      }
    } else {
      for (let i = 0; i < titleValueGets.length; i++) {
        // means some title field is empty after writing
        if (titleValueGets[i][1] == "") {
          for (let index = 0; index < fileArr.length; index++) {
            if (fileArr[index][1].name == titleValueGets[i][0]) {
              toast.warning(`Please Enter Title in Post ${++index}`);
              return;
            }
          }
        }
      }
    }

    // ! [keywords field]
    
    // check weather keyword field is not empty
    if (Object.keys(keyword).length == 0) {
      toast.warning("Please Enter Keyword in Post 1");
      return;
    }
    //  getting values in keyword field
    let keywordValueGets = Object.entries(keyword);

    // check weather all  keyword post must insert keyword

    if (keywordValueGets.length != fileArr.length) {
      let newArray = Array.from(fileArr);

      for (let index = 0; index < keywordValueGets.length; index++) {
        for (let i = 0; i <= fileArr.length; i++) {
          if (keywordValueGets[index][0] == fileArr[i][1].name) {
            let newArr = await newArray.filter((item) => {
              return item[1].name != keywordValueGets[index][0];
            });

            newArray = newArr;

            break;
          }
        }
      }

      if (newArray.length != 0) {
        for (let index = 0; index < fileArr.length; index++) {
          if (newArray[0][1].name == fileArr[index][1].name) {
            toast.warning(`Please Enter Keywords in Post ${++index}`);
            return;
          }
        }
      }
    } else {
      for (let i = 0; i < keywordValueGets.length; i++) {
        // means some keyword field is empty after writing
        if (keywordValueGets[i][1] == "") {
          for (let index = 0; index < fileArr.length; index++) {
            if (fileArr[index][1].name == keywordValueGets[i][0]) {
              toast.warning(`Please Enter Keywords in Post ${++index}`);
              return;
            }
          }
        }
      }
    }










    // ! [Description field]
    // check weather description field is not empty
    if (Object.keys(description).length == 0) {
      toast.warning("Please Enter Description in Post 1");
      return;
    }
    //  getting values in description field
    let descriptionValueGets = Object.entries(description);

    // check weather all  description post must insert description

    if (descriptionValueGets.length != fileArr.length) {
      let newArray = Array.from(fileArr);

      for (let index = 0; index < descriptionValueGets.length; index++) {
        for (let i = 0; i <= fileArr.length; i++) {
          if (descriptionValueGets[index][0] == fileArr[i][1].name) {
            let newArr = await newArray.filter((item) => {
              return item[1].name != descriptionValueGets[index][0];
            });

            newArray = newArr;

            break;
          }
        }
      }

      if (newArray.length != 0) {
        for (let index = 0; index < fileArr.length; index++) {
          if (newArray[0][1].name == fileArr[index][1].name) {
            toast.warning(`Please Enter Descriptions in Post ${++index}`);
            return;
          }
        }
      }
    } else {
      for (let i = 0; i < descriptionValueGets.length; i++) {
        // means some description field is empty after writing
        if (descriptionValueGets[i][1] == "") {
          for (let index = 0; index < fileArr.length; index++) {
            if (fileArr[index][1].name == descriptionValueGets[i][0]) {
              toast.warning(`Please Enter Description in Post ${++index}`);
              return;
            }
          }
        }
      }
    }


  };
  return (
    <div>
      <Toaster position="bottom-center" richColors closeButton />
      <ClientLoginVerify />
      <div className="mediaPost">
        <div className="post_section">
          <div className={style.mainUploadContainerParent}>
            {/* post section */}
            {file.length == 0 ? (
              <>
                <FileUploader
                  handleChange={handleChange}
                  multiple={true}
                  name="file"
                  types={fileTypes}
                >
                  <div className={style.uploadMedia}>
                    <h1>File Upload</h1>
                    <div className={style.fileUpload}>
                      <div className={style.uploadIconsMedia}>
                        <label className={style.menuIcon} htmlFor="upload">
                          <FontAwesomeIcon
                            icon={faCloudArrowUp}
                            className={style.uploadMedias}
                          />{" "}
                        </label>
                      </div>
                      <h2>Drag and Drop Files</h2>
                      <h3>
                        <hr /> or <hr />
                      </h3>
                      <div className={style.container}>
                        <div className={style.button_wrap}>
                          <label className={style.button} htmlFor="upload">
                            Upload Notes
                          </label>
                          <input
                            id="upload"
                            type="file"
                            onChange={handleChanges}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </FileUploader>
              </>
            ) : (
              <>
                {fileArr.length != 0 ? (
                  <>
                    {fileArr.map((item, index) => (
                      <div key={index}>
                        <div className={style.mainUploadContainer}>
                          <div className={style.upload}>
                            <div className={style.TopIcon}>
                              <FontAwesomeIcon
                                icon={faPenNib}
                                className={style.postIcon}
                              />
                              <span>Create Post #{++index}</span>
                            </div>
                            <div className={style.deleteIcon}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                title="Discard this post"
                                className={style.deleteIcon}
                                onClick={() => deletePost(item[1].name)}
                              />
                            </div>
                            <div className={style.innerUpload}>
                              {/* left media */}
                              <div className={style.leftMedia}>
                                <div className={style.post_info}>
                                  <li>
                                    <div className={style.title}>Title</div>
                                    <div className={style.input}>
                                      <input
                                        type="text"
                                        placeholder="Enter Title Of This Post"
                                        value={title[item[1].name]}
                                        onChange={(e) =>
                                          handleInput(e, item[1].name)
                                        }
                                      />
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Enter Keywords
                                    </div>
                                    <div className={style.input}>
                                      <input
                                        type="text"
                                        value={keyword[item[1].name]}
                                        onChange={(e) =>
                                          handleInputKeyword(e, item[1].name)
                                        }
                                        placeholder="Enter Keywords Of This Post like web,android,iot"
                                      />
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Post Visibility
                                    </div>
                                    <div className={style.input}>
                                      <select
                                        name="visibility"
                                        value={visibility[item[1].name]}
                                        onChange={(e) =>
                                          handleInputVisibility(e, item[1].name)
                                        }
                                      >
                                        <option>public</option>
                                        <option>private</option>
                                      </select>
                                    </div>
                                  </li>

                                  <li>
                                    <div className={style.title}>
                                      Post Description
                                    </div>
                                    <div className={style.input}>
                                      <textarea
                                        name="description"
                                        value={description[item[1].name]}
                                        onChange={(e) =>
                                          handleInputDescription(
                                            e,
                                            item[1].name
                                          )
                                        }
                                        placeholder="Describe The Post In Detail"
                                      ></textarea>
                                    </div>
                                  </li>
                                </div>
                              </div>
                              {/* right media */}
                              <div className={style.rightMedia}>
                                <div className={style.title}>
                                  Selected Media
                                </div>
                                <div className={style.mediaImages}>
                                  <Image
                                    src={URL.createObjectURL(item[1])}
                                    alt="media"
                                    layout="fill"
                                  />
                                </div>
                                <div className={style.imageMediaDes}>
                                  <h2>Filename</h2>
                                  <p>{item[1].name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
                {fileArr.length != 0 ? (
                  <>
                    <div className={style.uploadBtn}>
                      <button onClick={() => postMedia()}>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          title="Discard this post"
                          className={style.postMedia}
                        />{" "}
                        Post
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
