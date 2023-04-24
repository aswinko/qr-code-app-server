const QRCode = require("../models/qrCode.model");
const qr = require("qrcode");

exports.generateQrCode = (req, res) => {
  try {
    const tableId = req.body.tableId;
    const data = "http:localhost:3000/login?tableId=" + tableId;
    qr.toBuffer(data, (err, buffer) => {
      if (err) throw err;
      // buffer is the QR code image data as a Buffer
      // Create a new QRCode document and save it in MongoDB
      const qrCode = new QRCode({ data: data, image: buffer, tableId: tableId });
        qrCode.save().then((qrcode, error) => {
            if (qrcode) return res.status(201).json({ qrcode, message: "QR code saved" });
            if (error) return res.status(400).json({error})
          });;

        // .then((err) => {
        //     if (err) throw err;
        //     console.log("QR code saved");
        //   })
    });
  } catch (error) {
    log.error(error);
    res.status(500).send();
  }
};

exports.getAllQrCode = async (req, res) => {
    try {
        // const qrCodeId = req.params.id;
        await QRCode.find({ }).then((qrCodes, err) => {
            if (err) {
              console.error(err);
              res.status(400).json({err});
              return;
            }
            if (!qrCodes) {
              res.status(404).send('QR code not found');
              return;
            }
            // Set the content type header to image/png
            // res.setHeader('Content-Type', 'image/png');
            // Send the image data as the response body
            res.status(200).json({ qrCodes });
          })
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
  }


exports.getQrCodeById = async (req, res) => {
    try {
        const qrCodeId = req.params.id;
        await QRCode.findOne({ _id: qrCodeId }).then((qrCode, err) => {
            if (err) {
              console.error(err);
              res.status(500).json({err});
              return;
            }
            if (!qrCode) {
              res.status(404).send('QR code not found');
              return;
            }
            // Set the content type header to image/png
            res.setHeader('Content-Type', 'image/png');
            // Send the image data as the response body
            res.status(200).send(qrCode.image);
          })
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
  }