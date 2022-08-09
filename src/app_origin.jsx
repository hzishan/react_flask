import React, { Component } from "react";
import { hot } from "react-hot-loader";
import ImgsViewer from "react-images-viewer";

class App extends Component {
    constructor() {
        super();
        this.state = {
            selected_images: [],
            selected_doc: "AAA",
            checked_lesion_erythroplakia: false,
            checked_lesion_leukoplakia: false,
            checked_lesion_verrucous_hyperplasia: false,
            checked_lesion_lichen_planus: false,
            oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo: undefined,
            open_photo_viewer: false,
            photo_viewer_ind: 0,
        };
    }
    render() {
        return (
            <div className="app">
                <div style={{ border: "1px black solid" }}>
                    <label htmlFor="photos">照片：</label>
                    <input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(event) => {
                            let images = [];
                            if (event.target.files && event.target.files[0]) {
                                Promise.all(
                                    Array.from(event.target.files).map((file) => {
                                        images.push({ src: URL.createObjectURL(file), file: file });
                                    })
                                );
                            }
                            this.setState({
                                selected_images: images,
                                photo_viewer_ind: 0,
                            });
                        }}
                    />
                </div>

                <div style={{ border: "1px black solid", borderTop: "0px" }}>
                    <label htmlFor="doctor">拍攝醫師：</label>
                    <select
                        id="doctor"
                        onChange={(e) => {
                            this.setState({ selected_doc: e.target.value });
                        }}
                    >
                        <option>AAA</option>
                        <option>BBB</option>
                        <option>CCC</option>
                    </select>
                    <br />
                    <label htmlFor="lesion_types">病徵類型：</label>
                    <div id="lesion_types" style={{ display: "inline-block" }}>
                        <label htmlFor="erythroplakia">紅斑</label>
                        <input
                            id="erythroplakia"
                            type="checkbox"
                            onChange={(e) => {
                                this.setState({
                                    checked_lesion_erythroplakia: e.target.checked,
                                });
                            }}
                        />
                        <label htmlFor="leukoplakia">　白斑</label>
                        <input
                            id="leukoplakia"
                            type="checkbox"
                            onChange={(e) => {
                                this.setState({ checked_lesion_leukoplakia: e.target.checked });
                            }}
                        />
                        <label htmlFor="verrucous_hyperplasia">　疣狀增生</label>
                        <input
                            id="verrucous_hyperplasia"
                            type="checkbox"
                            onChange={(e) => {
                                this.setState({
                                    checked_lesion_verrucous_hyperplasia: e.target.checked,
                                });
                            }}
                        />
                        <label htmlFor="lichen_planus">　苔蘚</label>
                        <input
                            id="lichen_planus"
                            type="checkbox"
                            onChange={(e) => {
                                this.setState({
                                    checked_lesion_lichen_planus: e.target.checked,
                                });
                            }}
                        />
                    </div>
                </div>
                <div style={{ border: "1px black solid", borderTop: "0px" }}>
                    <button
                        onClick={(e) => {
                            let formData = new FormData();
                            this.state.selected_images.map((d) => {
                                formData.append("photos[]", d.file);
                            });
                            formData.append("doctor", this.state.selected_doc);
                            formData.append(
                                "lesions[]",
                                this.state.checked_lesion_erythroplakia
                            );
                            formData.append(
                                "lesions[]",
                                this.state.checked_lesion_leukoplakia
                            );
                            formData.append(
                                "lesions[]",
                                this.state.checked_lesion_verrucous_hyperplasia
                            );
                            formData.append(
                                "lesions[]",
                                this.state.checked_lesion_lichen_planus
                            );
                            fetch("https://aiia.csie.ncnu.edu.tw:6867", {
                                method: "POST",
                                header: {
                                    "Content-Type": "multipart/form-data",
                                },
                                body: formData,
                            })
                                .then((res) => {
                                    if (res.ok) {
                                        return res.text();
                                    }
                                })
                                .then((data) => {
                                    if (data !== undefined) {
                                        window.alert("finish");
                                        window.location.reload(false);
                                    } else {
                                        window.alert("server error");
                                    }
                                });
                        }}
                    >
                        上傳
                    </button>
                </div>
                <br />
                <div className="photo_viewer">
                    {this.state.selected_images.map((data, ind) => (
                        <div
                            className="photo"
                            style={{
                                backgroundImage: `url('${data.src}')`,
                            }}
                            onClick={(e) => {
                                this.setState({
                                    open_photo_viewer: true,
                                    photo_viewer_ind: ind,
                                });
                            }}
                        ></div>
                    ))}
                </div>
                {console.log(this.state.selected_images)}
                <ImgsViewer
                    key={Math.random()}
                    imgs={this.state.selected_images}
                    currImg={this.state.photo_viewer_ind}
                    isOpen={this.state.open_photo_viewer}
                    onClickPrev={(e) => {
                        this.setState({
                            photo_viewer_ind:
                                this.state.photo_viewer_ind === 0
                                    ? 0
                                    : this.state.photo_viewer_ind - 1,
                        });
                    }}
                    onClickNext={(e) => {
                        this.setState({
                            photo_viewer_ind:
                                this.state.photo_viewer_ind ===
                                    this.state.selected_images.length - 1
                                    ? this.state.selected_images.length - 1
                                    : this.state.photo_viewer_ind + 1,
                        });
                    }}
                    onClose={(e) => {
                        this.setState({ open_photo_viewer: false });
                    }}
                    backdropCloseable={true}
                    enableKeyboardInput={true}
                />
            </div>
        );
    }
}

export default hot(module)(App);
