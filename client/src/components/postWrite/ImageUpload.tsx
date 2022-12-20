import { imageUploadStore } from './../../store/PostStore';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';

export default function ImageUpload() {
  const { imgFiles, setImgFile } = imageUploadStore();
  const [fileImage, setFileImage] = useState<string[]>([]);

  // 이미지 갯수 제한(가장 우선), 이미지 크기 제한 구현해야 함
  // 게시글을 볼 때 메인 이미지를 어떻게 정할것인지?
  function imagePreview(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    // 유사배열 객체를 Array로 변환
    const files = Array.from(target.files as FileList);

    if (files.length > 3) {
      alert('이미지는 최대 3개까지만 등록 가능합니다. ');
      setImgFile([]);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      setFileImage((cur) => [...cur, URL.createObjectURL(files[i])]);
    }

    setImgFile(files);
  }

  // 미리보기 이미지 클릭 시 해당 이미지 삭제
  // function deleteImagehandler(e: React.MouseEvent<HTMLImageElement>) {}

  return (
    <section className="mb-4 flex flex-row">
      <label
        htmlFor="fileUpload"
        className="inline-block w-[70px] h-[70px] mr-3 text-center text-xs border-solid border border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg"
      >
        <AiFillCamera className="w-6 h-6 mx-auto mt-3.5 mb-[2px]" />
        <div className="text-gray-400">{fileImage.length} / 3</div>
      </label>
      <input
        onChange={imagePreview}
        type="file"
        id="fileUpload"
        accept="image/*"
        multiple
        className="w-0 h-0 p-0 overflow-visible"
        // className="block w-[500px] text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold cursor-pointer file:bg-b-bg-gray file:text-b-text-black  hover:file:bg-gray-200 file:cursor-pointer"
      />
      <div className="flex flex-row">
        {fileImage.map((fileUrl) => {
          return (
            <img
              // onClick={deleteImagehandler}
              key={fileUrl}
              alt="이미지"
              src={fileUrl}
              className="w-[70px] h-[70px] mr-2 border-solid border border-gray-300"
            />
          );
        })}
      </div>
    </section>
  );
}
