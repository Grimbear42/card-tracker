export default function handler(req : any, res: any) {
  const body = req.body;

  console.log('body: ', body);

  if(!body.first || !body.last) {
    return res.status(400).json({data: 'Invalid Data received!' });
  }

  res.status(200).json({ data: `${body.first} ${body.last}`});
}
