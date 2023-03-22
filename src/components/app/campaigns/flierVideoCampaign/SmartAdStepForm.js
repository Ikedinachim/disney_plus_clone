import React, { useState, useEffect, useMemo, useCallback } from "react";
import { count } from "sms-length";
import FlierVideoCampaign from "./FlierVideoCampaign";
import TargetAudience from "./TargetAudience";
import axios from "axios";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletFlierVideo from "./FundWalletFlierVideo";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SmartAdStepForm = () => {
  const location = useLocation();
  window.history.replaceState({}, document.title);
  const isEcommerce = location?.state?.fromStore;
  const { store } = useSelector((state) => state.store || []);
  const [smartAdsData, setSmartAdsData] = useState({
    step: 1,
    senderId: "",
    alternateSenderId: "",
    channel: "",
    url: isEcommerce ? store?.url : "",
    campaignMessage: "",
    nonEncodedMessage: "",
    targetAge: "21",
    location: ["Lagos"],
    interest: "",
    arrayInterest: [],
    arrayInterestLabel: [],
    phoneNumber: "",
    whatsAppNumber: "",
    numbers: "",
    ussd: "",
    smsNumber: "",
    callToAction: "",
    timeRangeFrom: "",
    timeRangeTo: "",
    campaignImage: "",
    attachmentPreview: "",
    targetAudience: [],
    campaignSchedule: "Day",
    uploadedImage: "",
    campaignType: "flier_video",
    targetAudienceOption: "mysogidb",
    assetType: "image",
    imageUrl: null,
    imageAlt: "",
    imageUrls: [],
    uploadPercentage: 0,
    rawVideoUrl: "",
    price: 0,
    audience: 0,
    limit: undefined,
    budget: 20000,
    contactNumberCount: 0,
    characterCount: 0,
    smsCount: 1,
    callToActionCount: 0,
    signature: "",
    scheduleOption: "none",
    scheduleTime: "",
    scheduleFrom: "",
    scheduleTo: "",
    ageRangeTo: undefined,
    ageRangeFrom: undefined,
    age: "18-29",
    gender: "B",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",
    revenueBand: "",
    selectedFileName: "Upload Asset *png, *jpg, *gif",
    parsedCsvData: [],
    uploadFileType: "",
    arrayState: undefined,
    rawLga: undefined,
    rawArea: undefined,
    arrayLga: undefined,
    arrayArea: undefined,
    filterParameters: [],
    attachments: [],
    videoUrl: "",
    videoError: "",
    attachment: "",
    personalUpload: [],
    uploadedFileName: "",
    manual_import_audience: [],
    manual_audience: [],
  });

  const {
    step,
    alternateSenderId,
    campaignMessage,
    nonEncodedMessage,
    url,
    whatsAppNumber,
    phoneNumber,
    ussd,
    smsNumber,
    callToAction,
    timeRangeFrom,
    timeRangeTo,
    interest,
    arrayInterest,
    arrayInterestLabel,
    selectedFileName,
    signature,
    uploadPercentage,
    characterCount,
    smsCount,
    numbers,
    ageRangeTo,
    ageRangeFrom,
    callToActionCount,
    arrayState,
    arrayLga,
    rawLga,
    rawArea,
    arrayArea,
    rawVideoUrl,
    parsedCsvData,
    uploadFileType,
    budget,
    channel,
    targetAudienceOption,
    filterParameters,
    age,
    gender,
    deviceType,
    deviceBrand,
    revenueBand,
    audience,
    price,
    csvArray,
    videoUrl,
    assetType,
    imageUrl,
    videoError,
    senderId,
    imageUrls,
    campaignType,
    limit,
    contactNumberCount,
    campaignSchedule,
    attachment,
    scheduleFrom,
    scheduleOption,
    scheduleTime,
    scheduleTo,
    targetAudience,
    attachments,
    personalUpload,
    state,
    uploadedFileName,
    manual_import_audience,
    manual_audience,
  } = smartAdsData;

  // go back to previous step
  const prevStep = () => {
    setSmartAdsData({ ...smartAdsData, step: step - 1 });
  };

  // proceed to the next step
  const nextStep = () => {
    setSmartAdsData({ ...smartAdsData, step: step + 1 });
  };

  // Handle fields change
  const handleChange = (input) => (e) => {
    if (input === "nonEncodedMessage") {
      setSmartAdsData({
        ...smartAdsData,
        [input]: e.target.value,
        campaignMessage: e.target.value,
        characterCount: count(e.target.value + smartAdsData.signature).length,
        smsCount: count(
          e.target.value + smartAdsData.signature + Array(26).join("x")
        ).messages,
      });
    } else if (input === "callToAction") {
      setSmartAdsData({
        ...smartAdsData,
        callToActionCount: e.target.value.length,
        [input]: e.target.value,
      });
    } else if (input === "signature") {
      setSmartAdsData({
        ...smartAdsData,
        [input]: e.target.value,
        characterCount: count(e.target.value + campaignMessage).length,
        smsCount: count(e.target.value + campaignMessage + Array(26).join("x"))
          .messages,
      });
    } else {
      setSmartAdsData({ ...smartAdsData, [input]: e.target.value });
    }
  };

  const uploadImage = useCallback(async (file) => {
    let imageUrl;
    let reader = new FileReader();
    reader.readAsDataURL(file);

    const maxFileSize = 2097152;
    const MAX_WIDTH = 900;
    const MAX_HEIGHT = 600;

    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        let img = new Image();
        img.onload = async () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let width = img.width;
          let height = img.height;

          if (file.size > maxFileSize) {
            toast.error(
              "The selected image file is too big. Please choose one that is smaller than 2 MB."
            );
          } else {
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            let ctx2 = canvas.getContext("2d");
            ctx2.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/png");
            let files = dataurl;
            const formData = new FormData();
            formData.append("file", files);
            formData.append("upload_preset", "mysogi");

            const options = {
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                  setSmartAdsData((prevState) => ({
                    ...prevState,
                    uploadPercentage: percent,
                  }));
                }
              },
            };

            try {
              const res = await axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData,
                options
              );
              imageUrl = res.data.secure_url;
              setSmartAdsData((prevState) => ({
                ...prevState,
                // imageUrl,
                uploadPercentage: 100,
                // imageAlt: `An image of ${res.original_filename}`,
              }));
              setTimeout(() => {
                setSmartAdsData((prevState) => ({
                  ...prevState,
                  uploadPercentage: 0,
                }));
              }, 1000);
              resolve(imageUrl);
            } catch (err) {
              reject(err);
            }
          }
        };
        img.src = e.target.result;
      };
    });
  }, []);

  const handleImageUpload = useCallback(
    async (e) => {
      let urls = [];
      let file = e.target.files[0];

      if (channel === "display_ads") {
        for (let i = 0; i < e.target.files.length; i++) {
          file = e.target.files[i];
          const imageUrl = await uploadImage(file);
          urls.push(imageUrl);
        }
        setSmartAdsData((prevState) => ({
          ...prevState,
          imageUrls: urls,
          attachments: urls,
        }));
      } else {
        const imageUrl = await uploadImage(file);
        setSmartAdsData((prevState) => ({
          ...prevState,
          imageUrl,
          selectedFileName: file.name,
        }));
      }
    },
    [channel, uploadImage]
  );

  const handleImageDelete = (e) => {
    const uuid = e.target.id;
    const attachments = imageUrls;
    setSmartAdsData({
      ...smartAdsData,
      imageUrls: attachments.filter((i) => i !== uuid),
      attachments: attachments.filter((i) => i !== uuid),
      imageUrl: attachments[attachments.length - 1],
    });
  };

  const handleCount = useCallback((count) => {
    setSmartAdsData((prevState) => ({
      ...prevState,
      contactNumberCount: count,
    }));
  }, []);

  const handleStateChange = (state) => {
    setSmartAdsData({ ...smartAdsData, arrayState: state });
  };

  const handleLgaChange = (lga) => {
    setSmartAdsData({
      ...smartAdsData,
      arrayLga: lga.map((value) => value.value).join(","),
      rawLga: lga,
    });
  };

  const handleAreaChange = (area) => {
    setSmartAdsData({
      ...smartAdsData,
      arrayArea: area.map((value) => value.value).join(","),
      rawArea: area,
    });
  };

  const handleInterestChange = (interest) => {
    setSmartAdsData({
      ...smartAdsData,
      arrayInterest: interest,
      interest: interest.map((value) => value.value).join(", "),
      arrayInterestLabel: interest.map((label) => label.label).join(", "),
    });
  };

  const handleParsedFileData = (
    uploadedFile,
    uploadedFileType,
    uploadedFileName
  ) => {
    setSmartAdsData({
      ...smartAdsData,
      parsedCsvData: uploadedFile,
      uploadFileType: uploadedFileType,
      uploadedFileName: uploadedFileName,
      personalUpload: uploadedFile.reduce((acc, { Numbers }) => {
        if (Numbers !== null) {
          acc.push(Numbers);
        }
        return acc;
      }, []),
    });
  };

  console.log("smartAdsData", smartAdsData);

  useEffect(() => {
    const getAudience = () => {
      if (targetAudienceOption !== "manual_import") {
        if (numbers === "") {
          const newTargetAudience = [];
          setSmartAdsData((prevState) => ({
            ...prevState,
            manual_audience: newTargetAudience,
          }));
          return newTargetAudience;
        } else {
          const newTargetAudience = numbers.split(",");
          setSmartAdsData((prevState) => ({
            ...prevState,
            manual_audience: newTargetAudience,
          }));
          return newTargetAudience;
        }
      }

      let upload = [];
      if (uploadFileType === "csv") {
        upload = extractNumbersFromCsv(parsedCsvData);
      } else if (uploadFileType === "txt") {
        upload = parsedCsvData.map((n) => n);
      }

      if (upload.length > 0) {
        updateTargetAudience(upload, setSmartAdsData);
      } else {
        return [];
      }
      return upload;
    };

    function extractNumbersFromCsv(parsedCsvData) {
      return parsedCsvData
        .map(({ Numbers }) => Numbers)
        .filter((n) => n !== null);
    }

    function updateTargetAudience(newTargetAudience, setSmartAdsData) {
      setSmartAdsData((prevState) => ({
        ...prevState,
        manual_import_audience: newTargetAudience,
      }));
    }

    const setAudienceAndPrice = () => {
      const newAudience =
        channel === "display_ads" ? budget / 5 : getAudience().length;
      const newPrice = newAudience * 5 * smsCount;
      setSmartAdsData((prevState) => ({
        ...prevState,
        audience: newAudience,
        price: newPrice,
      }));
    };

    setAudienceAndPrice();
  }, [
    budget,
    channel,
    numbers,
    smsCount,
    targetAudienceOption,
    uploadFileType,
    parsedCsvData,
  ]);

  const setAge = useMemo(() => {
    const setAge =
      // channel === "display_ads"
      //   ? age
      //   : ageRangeFrom && ageRangeTo
      //   ? `${ageRangeFrom + "-" + ageRangeTo}`
      //   : "";
      ageRangeFrom && ageRangeTo ? `${ageRangeFrom + "-" + ageRangeTo}` : "";
    return setAge;
  }, [ageRangeFrom, ageRangeTo]);

  const filterOptions = useMemo(() => {
    return {
      ageRange: setAge,
      state: arrayState && arrayState.map((value) => value.value).join(","),
      lga: arrayLga,
      area: arrayArea,
      gender,
      deviceType,
      deviceBrand,
      revenueBand,
    };
  }, [
    setAge,
    gender,
    arrayState,
    arrayLga,
    arrayArea,
    deviceType,
    deviceBrand,
    revenueBand,
  ]);

  useEffect(() => {
    setSmartAdsData((prevState) => ({
      ...prevState,
      filterParameters: [filterOptions],
    }));
  }, [filterOptions]);

  useEffect(() => {
    if (targetAudienceOption === "manual_import") {
      setSmartAdsData((prevState) => ({
        ...prevState,
        targetAudience: manual_import_audience,
      }));
    } else if (targetAudienceOption === "manual") {
      setSmartAdsData((prevState) => ({
        ...prevState,
        targetAudience: manual_audience,
      }));
    }
  }, [targetAudienceOption, manual_import_audience, manual_audience]);

  const setYoutubeUrl = (url) => {
    const regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    const match = url && url.match(regExp);
    const watchUrl = `https://www.youtube.com/watch?v=${match && match[1]}`;

    return match
      ? { videoUrl: watchUrl, videoError: false }
      : { videoUrl: "", videoError: true };
  };

  useEffect(() => {
    const setAssets = () => {
      if (assetType === "image" && channel === "smart_sms") {
        return imageUrl;
      } else if (assetType === "video") {
        return videoUrl;
      } else return null;
    };
    const { videoUrl, videoError } = setYoutubeUrl(rawVideoUrl);
    setSmartAdsData((s) => ({
      ...s,
      attachment: setAssets(),
      videoUrl,
      videoError,
    }));
  }, [rawVideoUrl, assetType, imageUrl, channel, videoUrl]);

  const previewUploadedNumbers =
    targetAudienceOption === "manual_import"
      ? targetAudience.slice(0, targetAudience.length)
      : [];

  switch (step) {
    case 1:
      return (
        <FlierVideoCampaign
          nextStep={nextStep}
          handleChange={handleChange}
          handleImageUpload={handleImageUpload}
          selectedFileName={selectedFileName}
          handleImageDelete={handleImageDelete}
          uploadPercentage={uploadPercentage}
          characterCount={characterCount}
          smsCount={smsCount}
          callToActionCount={callToActionCount}
          videoError={videoError}
          values={{
            senderId: senderId,
            alternateSenderId: alternateSenderId,
            channel: channel,
            campaignMessage: campaignMessage,
            nonEncodedMessage: nonEncodedMessage,
            timeRange: [timeRangeFrom, timeRangeTo],
            url: url,
            whatsAppNumber: whatsAppNumber,
            filterParameters: filterParameters,
            callToAction: callToAction,
            assetType: assetType,
            attachment: attachment,
            attachments: attachments,
            phoneNumber: phoneNumber,
            ussd: ussd,
            smsNumber: smsNumber,
            signature: signature,
          }}
        />
      );
    case 2:
      return (
        <TargetAudience
          values={{
            campaignSchedule: campaignSchedule,
            scheduleFrom: scheduleFrom,
            budget: budget,
            targetAudienceOption: targetAudienceOption,
            targetAudience: targetAudience,
            scheduleTo: scheduleTo,
            gender: gender,
            age: setAge,
            interest: interest,
            arrayInterest: arrayInterest,
            channel: channel,
          }}
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          handleStateChange={handleStateChange}
          handleLgaChange={handleLgaChange}
          handleAreaChange={handleAreaChange}
          handleInterestChange={handleInterestChange}
          numbers={numbers}
          personalUpload={personalUpload}
          filterOptions={filterOptions}
          ageRangeFrom={ageRangeFrom}
          ageRangeTo={ageRangeTo}
          arrayState={arrayState}
          rawLga={rawLga}
          rawArea={rawArea}
          arrayInterest={arrayInterest}
          previewUploadedNumbers={previewUploadedNumbers}
          handleParsedFileData={handleParsedFileData}
          uploadedFileName={uploadedFileName}
        />
      );
    case 3:
      return (
        <PreviewCampaign
          prevStep={prevStep}
          nextStep={nextStep}
          values={{
            url: url,
            scheduleFrom: scheduleFrom,
            scheduleTo: scheduleTo,
            scheduleOption: scheduleOption,
            channel: channel,
            limit: limit,
            targetAudienceOption: targetAudienceOption,
            ussd: ussd,
            phoneNumber: phoneNumber,
            whatsAppNumber: whatsAppNumber,
            smsNumber: smsNumber,
            campaignMessage: campaignMessage,
            signature: signature,
            callToAction: callToAction,
            campaignType: campaignType,
            state: state,
            interest: interest,
            arrayInterestLabel: arrayInterestLabel,
            arrayInterest: arrayInterest,
            gender: gender,
            campaignSchedule: campaignSchedule,
            budget: budget,
            assetType: assetType,
            attachment: attachment,
            alternateSenderId: alternateSenderId,
            scheduleTime: scheduleTime,
            targetAudience: targetAudience,
            filterParameters: filterParameters,
            contactNumberCount: contactNumberCount,
            attachments: attachments,
            timeRange: `${timeRangeFrom} - ${timeRangeTo}`,
            age: setAge,
          }}
          audience={audience}
          handleCount={handleCount}
          price={price}
          filterOptions={filterOptions}
          handleChange={handleChange}
          smsCount={smsCount}
        />
      );
    case 4:
      return (
        <FundWalletFlierVideo
          prevStep={prevStep}
          values={{
            scheduleOption: scheduleOption,
            targetAudienceOption: targetAudienceOption,
            channel: channel,
            limit: limit,
            scheduleFrom: scheduleFrom,
            scheduleTo: scheduleTo,
            price: price,
          }}
          smsCount={smsCount}
        />
      );
    default:
    // do nothing
  }
};

export default SmartAdStepForm;
