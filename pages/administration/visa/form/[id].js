import React, { useEffect } from 'react'
import { Select, Button, MenuItem, capitalize, FormControl, FormLabel, RadioGroup, Card, Grid, TextField, Divider, Typography, Stack, FormControlLabel, Radio, } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useForm, useWatch, Controller, } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router';

import FormLayout from '../../../../components/utils/FormLayout'
import BasicLayout from '../../../../components/utils/BasicLayout'
import FormParent from '../../../../components/utils/FormParent';

const pilihan_permohonan = [
	{
		id : 1,
		name : 'BARU',
		options : [
			{
				id : 1,
				name : 'Itas 1th'
			},
			{
				id : 2,
				name : 'Itas 2th'
			},
			{
				id : 3,
				name : 'Itas maks. 6 bln'
			},
			{
				id : 4,
				name : 'Itap'
			},
		],
	},
	{
		id : 2,
		name : 'PERPANJANGAN',
		options : [
			{
				id : 1,
				name : 'Itas 1th'
			},
			{
				id : 2,
				name : 'Itas 2th'
			},
			{
				id : 3,
				name : 'Itas maks. 6 bln'
			},
			{
				id : 4,
				name : 'Itap'
			},
		],
	},
	{
		id : 3,
		name : 'DUPLIKAT',
		options : [
			{
				id : 1,
				name : 'Kitas'
			},
			{
				id : 2,
				name : 'Kitap'
			},
		],
	},
	{
		id : 4,
		name : 'ALIH STATUS',
		options : [
			{
				id : 1,
				name : 'Itas Ke Itap'
			},
		],
	},
]

const pilihan_status_sipil = [
	{
		id : 1,
		name : 'Kawin',
	},
	{
		id : 2,
		name : 'Tidak Kawin',
	},
	{
		id : 3,
		name : 'Cerai Mati',
	},
	{
		id : 4,
		name : 'Cerai Hidup',
	},
]

const pilihan_kategori_penjamin = [
	{
		id : 1,
		name : 'Swasta',
	},
	{
		id : 2,
		name : 'Pemerintah',
	},
	{
		id : 3,
		name : 'Perorangan',
	},
	{
		id : 4,
		name : 'Organisasi Internasional',
	},
]

const pilihan_status_usaha = [
	{
		id : 1,
		name : 'Pegawai',
	},
	{
		id : 2,
		name : 'Anggota Keluarga',
	},
	{
		id : 3,
		name : 'Pemegang Saham',
	},
	{
		id : 4,
		name : 'Lainnya',
	},
]

const pilihan_bidang_pekerjaan = [
	{
		id : 1,
		name : 'Perdagangan',
	},
	{
		id : 2,
		name : 'Perindustrian',
	},
	{
		id : 3,
		name : 'Pertambangan & Energi',
	},
	{
		id : 4,
		name : 'Pekerjaan Umum',
	},
	{
		id : 5,
		name : 'Pertanian',
	},
	{
		id : 6,
		name : 'Kehutanan',
	},
	{
		id : 7,
		name : 'Parpostel',
	},
	{
		id : 8,
		name : 'Keuangan',
	},
	{
		id : 9,
		name : 'Keagamaan/Rohaniawan',
	},
	{
		id : 10,
		name : 'Sosial & Mahasiswa',
	},
	{
		id : 11,
		name : 'Pelajar / Mahasiswa',
	},
	{
		id : 12,
		name : 'Pendidikan & Kebudayaan',
	},
	{
		id : 13,
		name : 'Perhubungan',
	},
	{
		id : 14,
		name : 'Anggota Keluarga',
	},
	{
		id : 15,
		name : 'Lainnya',
	},
]

function VisaForm() {
	const { register, setValue, control, handleSubmit,formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);
	const router = useRouter()

	const { id } = router.query

	useEffect(() => {
		if(id)
			getDataVisa()

			async function getDataVisa() {
				try {
					const { data } = await axios.get('/api/visa-form?id=' + id)	
					if(data)
						if(data[0]) {
							const visaData= data[0]
              // console.log(`🚀 ~ file: [id].js ~ line 222 ~ getDataVisa ~ visaData`, visaData)
							Object.keys(visaData).map(key => setValue(key, visaData[key]))
						}
				} catch (error) {
					if(error.response)	
						alert(error.response.data)
					else
						alert(error)
				}	
		}
	}, [id])
	

	async function onSubmit(data) {
		try {
			await axios.post('/api/visa-form',[data])	
			alert("Data already Saved")
			router.push('/administration/visa/form/list')
		} catch (error) {
			if(error.response)	
				alert(error.response.data)
			else
				alert(error)
		}	
	}

	// const watchAllFields = watch()
  // console.log(`🚀 ~ file: index.js ~ line 88 ~ VisaForm ~ watchAllFields`, watchAllFields)

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
			<FormLayout title="VISA Application Form">
				<Grid xs={12} p={1}>
						{/* <Card
						sx={{
							width : '100%',
							mx : 'auto',
						}}
						> */}
							<form onSubmit={handleSubmit(onSubmit)} >
							<Grid
								container
								spacing={1}
								direction="row"
								// justifyContent="space-between"
								justifyContent="center"
								alignItems="flex-start"
								alignContent="stretch"
								wrap="wrap"
								px={5}	
							>
								<Grid
									item
									xs={6}
									pr={3}
								>
									<Typography variant="h6" color="initial" my={3}>FORMULIR</Typography>
									<ControllerTextField control={control} name="perdim" label="PERDIM" />
									<ControllerTextField control={control} name="no" label="NO" />
									<ControllerTextField control={control} name="kantor_wilayah" label="KANTOR WILAYAH" />
									<ControllerTextField control={control} name="kantor_imigrasi" label="KANTOR IMIGRASI" />
									<Stack my={4}><Divider /></Stack>
									<Typography variant="h6" color="initial" my={3}>PERMOHONAN</Typography>
									<ControllerTextField control={control} name="tgl_permohonan" label="TGL PERMOHONAN"
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField {...params} sx={{ margin : '.5rem 0', maxWidth : 200 }} />}
												/>
											)
										}}
									/>
									<Stack
										direction="row"
										justifyContent="flex-start"
										sx={{
											width : '100%',
											// maxWidth : 250,
											my : 1,
										}}
									>
									<ControllerTextField control={control} 
									name="jenis_permohonan" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset" >
													<FormLabel component="legend" ></FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ mr : 3}}
														autoWidth
													>
														{
															pilihan_permohonan.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									<ControllerTextField control={control} 
									name="lama_permohonan" 
										CustomComponent={function(props) {
											const permohonan_terpilih = useWatch({
												control,
												name : 'jenis_permohonan'
											})
											return (
												<FormControl component="fieldset" >
													<FormLabel component="legend" ></FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ maxWidth : 300 }}
													>
														{
															// pilihan_permohonan[pilihan_permohonan.findIndex(x => x.id == (parseInt(watchAllFields?.jenis_permohonan) || 1))].options
															pilihan_permohonan[pilihan_permohonan.findIndex(x => x.id == (parseInt(permohonan_terpilih) || 1))].options
															.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									</Stack>
									<Stack my={4}><Divider /></Stack>
										<Grid
											container
											spacing={1}
											direction="row"
											justifyContent="center"
											alignItems="flex-start"
											alignContent="stretch"
											wrap="wrap"
										>
											<Grid item xs={6}>
									<Stack>
									<ControllerTextField control={control} 
									name="status_sipil" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset" >
													<FormLabel component="legend" >STATUS SIPIL</FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ mr : 3}}
														autoWidth
													>
														{
															pilihan_status_sipil.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									</Stack>
									<Stack>
									<ControllerTextField control={control} 
									name="kategori_penjamin" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset" sx={{ mt : 5}}>
													<FormLabel component="legend" >KATEGORI PENJAMIN</FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ mr : 3}}
														autoWidth
													>
														{
															pilihan_kategori_penjamin.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									</Stack>
												</Grid>	
											<Grid item xs={6}>
									<Stack>
									<ControllerTextField control={control} 
									name="status_usaha" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset" >
													<FormLabel component="legend" >STATUS USAHA</FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ mr : 3}}
														autoWidth
													>
														{
															pilihan_status_usaha.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									</Stack>
									<Stack>
									<ControllerTextField control={control} 
									name="bidang_pekerjaan" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset" sx={{ mt : 5}}>
													<FormLabel component="legend" >BIDANG PEKERJAAN</FormLabel>
													<TextField
														select
														InputLabelProps={{shrink: false}}
														{...props}
														label={null}
														defaultValue={1}
														sx={{ mr : 3}}
														autoWidth
													>
														{
															pilihan_bidang_pekerjaan.map(item => 
																<MenuItem value={item.id}>{item.name}</MenuItem>
																)
														}
													</TextField>
												</FormControl>
											)
										}}
									/>
									</Stack>
												</Grid>	
										</Grid>
										<Stack my={4}><Divider /></Stack>
										<Stack>
											<ControllerTextField control={control} name="nama_kuasa" label="Nama yang diberi kuasa" />
											<ControllerTextField control={control} name="ktp_kuasa" label="Nomor KTP yang diberi kuasa" />
										</Stack>
									</Grid>
									<Grid
										item
										xs={6}
									>
									<Typography variant="h6" color="initial" my={3}>INFO PRIBADI</Typography>
									<ControllerTextField control={control} name="nama_lengkap" label="NAMA LENGKAP" />
									<ControllerTextField control={control} 
									name="jenis_kelamin" 
										CustomComponent={function(props) {
											return (
												<FormControl component="fieldset">
													{/* <FormLabel component="legend" sx={{ color : "#003b5c", }}>Gender</FormLabel> */}
													<RadioGroup  {...props} 
														defaultValue={1}
													>
														<Stack
															direction="row"
															justifyContent="space-between"
															sx={{
																width : '100%',
															}}
														>
														{
															['L','P'].map((item,idItem) =>
																<FormControlLabel value={idItem+1} control={<Radio />} label={item} />
																)
														}
														</Stack>
													</RadioGroup>
													{/* <FormHelperText></FormHelperText> */}
												</FormControl>
											)
										}}
									/>
									<ControllerTextField control={control} name="tempat_lahir" label="TEMPAT LAHIR" />
									<ControllerTextField control={control} name="tanggal_lahir" label="TANGGAL LAHIR"
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField {...params} sx={{ margin : '.5rem 0', maxWidth : 200 }} />}
												/>
											)
										}}
									/>
									<ControllerTextField control={control} name="nomor_passport" label="NOMOR PASSPORT/ DOKUMEN PERJALANAN" />
									<ControllerTextField control={control} name="tanggal_dikeluarkan" label="TANGGAL DIKELUARKAN"
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField {...params} sx={{ margin : '.5rem 0', maxWidth : 200 }} />}
												/>
											)
										}}
									/>
									<ControllerTextField control={control} name="berlaku_sampai" label="BERLAKU S/D"
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField {...params} sx={{ margin : '.5rem 1rem', maxWidth : 200 }} />}
												/>
											)
										}}
									/>
									<ControllerTextField control={control} name="tempat_dikeluarkan" label="TEMPAT DIKELUARKAN" />
									<ControllerTextField control={control} name="pekerjaan" label="PEKERJAAN" />
									<ControllerTextField control={control} name="alamat_pekerjaan" label="ALAMAT KANTOR/PEKERJAAN" />
									<ControllerTextField control={control} name="telpon_kantor" label="TELP/HP KANTOR/PEKERJAAN" />
									<ControllerTextField control={control} name="alamat_tempat_tinggal" label="ALAMAT TEMPAT TINGGAL DI INDONESIA" />
									<ControllerTextField control={control} name="telpon" label="TELP/HP" />
									<ControllerTextField control={control} name="alamat_email_penjamin" label="ALAMAT EMAIL PENJAMIN" />
									<ControllerTextField control={control} name="nama_penjamin" label="NAMA PENJAMIN" />
									<ControllerTextField control={control} name="alamat_penjamin" label="ALAMAT PENJAMIN" />
									<ControllerTextField control={control} name="telpon_penjamin" label="TELP/HP PENJAMIN" />
									<Stack my={4}><Divider variant='middle'/></Stack>
								</Grid>
								<Grid item xs={6} pr={3}>
									<Stack>
									<FormControl component="fieldset" sx={{ mt : 5}}>
									<FormLabel component="legend" >Bagi anak dengan penjamin satu orang tuanya WNI</FormLabel>
									<Stack m={1}></Stack>
									<ControllerTextField control={control} name="ktp_penjamin" label="Nomor KTP Ayah/Ibu" />
									</FormControl>
									<Stack m={1}></Stack>
									<ControllerTextField control={control} name="tgl_ktp" 
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField 
														{...params} 
														label="TANGGAL DIKELUARKAN KTP"
														sx={{ margin : '.5rem 0', maxWidth : 300 }} />}
												/>
											)
										}}
									/>
									</Stack>
									</Grid>
								<Grid item xs={6}>
									<Stack>
									<FormControl component="fieldset" sx={{ mt : 5}}>
									<FormLabel component="legend" >Bagi anak yang lahir di Indonesia</FormLabel>
									<Stack m={1}></Stack>
									<ControllerTextField control={control} name="no_akte" label="Nomor Akte Kelahiran Anak" />
									</FormControl>
									<Stack m={1}></Stack>
									<ControllerTextField control={control} name="tgl_akte" 
										CustomComponent={function(props) {
											return(
												<DatePicker
													shouldDisableTime={() => true}
													{...props}
													value={props.value || null}
													// label="Date&Time picker"
													// value={start_time}
													// onChange={setStartTime}
													renderInput={(params) => <TextField 
														{...params} 
														label="TANGGAL DIKELUARKAN AKTE"
														sx={{ margin : '.5rem 0', maxWidth : 300 }} />}
												/>
											)
										}}
									/>
									</Stack>
								</Grid>
							</Grid>
        <Stack
          direction="row"
          alignItems="center"
          ml={5}
          my={3}
          sx={{ width: "60%", display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 150,
            }}
            startIcon={() => <></>}
						// onClick={submitStudent}
						type="submit"
          >
            Submit
          </Button>
        </Stack>
							</form>
						{/* </Card> */}
				</Grid>
			</FormLayout>
			</LocalizationProvider>
		</>
	)
}

export default VisaForm

function ControllerTextField({control, name, CustomComponent, label, rules }) {
  // console.log(`🚀 ~ file: index.js ~ line 571 ~ ControllerTextField ~ label`, label)
  // console.log(`🚀 ~ file: form.jsx ~ line 1226 ~ ControllerTextField ~ rules`, rules)
	return (
		<Controller
			control={control}
			rules={{
				required : rules?.required,
				validate : rules?.validate,
			}}
			name={name}
			render={({ field : { onChange, onBlur, value, ref }}) => (
				<>
				{
					CustomComponent ?
					<CustomComponent 
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						ref={ref}
						label={name ? name.split('_').map(x => capitalize(x)).join(' ') : ''}
					/>
					:
				<TextField
					key={name}
					size='small'
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					ref={ref}
					label={label || (name ? name.split('_').map(x => capitalize(x)).join(' ') : '')}
					sx={{
						margin : '.25rem 0',
						width : '100%',
						maxWidth : '600px',
					}}
					// InputLabelProps={{ shrink : value, }}
					InputLabelProps={{ shrink: !!value }}
				/>														
				}
				</>
			)}
		/>
	)	
}

function splitOptions(string) {
	let result = []
    const split = string.split(', ')
    split.map(item => result = [...result, ...item.split(',')])
  	return result
}

function SelectOptions({ field, item, label, multipleChoice }) {
	if(!multipleChoice)
		return (
    <FormControl
			key={item.id}
      sx={{
        width: "100%",
        my: 3,
      }}
    >
			<FormLabel id="demo-row-radio-buttons-group-label" sx={{ textAlign : 'left', color : 'black', }}>{label}  :</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
				sx={{
					display : 'flex',
					justifyContent : 'left',
				}}
        defaultValue={item.value || (multipleChoice ? [] : '')}
        {...field}
				value={field.value}
				onChange={field.onChange}
      >
        {/* {item.option_value.split(",").map((x, idx) => { */}
        {splitOptions(item.option_value).map((x, idx) => {
					const menuValue = item.option_number? splitOptions(item.option_number)[idx] : x
					// if(menuValue == field.value)
					// 	console.log("ini : ", field.value, menuValue)
          return (
						<Button key={x} variant="contained" sx={{ margin : '1em'}} color={menuValue == field.value ? 'secondary' : 'primary'}
								endIcon={menuValue == field.value && <CheckIcon />}
						>
        			<FormControlLabel 
								// value={item.option_number? item.option_number.split(",")[idx] : x} 
								value={menuValue}
								control={<Radio sx={{ display : 'none'}} />} label={x} 
							sx={{
								margin : 0,
							}} 
							/>
						</Button>
          );
        })}
      </RadioGroup>
		</FormControl>
		)
  return (
    <FormControl
      sx={{
        width: "100%",
        my: 1,
      }}
    >
      {/* <InputLabel id={item.id}>
        {label}
      </InputLabel>
      <Select
        size="small"
        sx={{
          textAlign: "left",
        }}
        // displayEmpty
        // label={item.label || item.name}
        label={label}
        labelId={item.name}
        multiple={multipleChoice != false ? true : false}
        // multiple
        defaultValue={item.value || (multipleChoice ? [] : '')}
        // value={item.value || (multipleChoice ? [] : '')}
        // value={item.value ?? []}
        {...field}
      >
				<MenuItem
					key={1}
					value=""
				>
				Tidak ada
				</MenuItem>
        {splitOptions(item.option_value).map((x, idx) => {
					const menuValue = item.option_number? splitOptions(item.option_number)[idx] : x
          return (
            <MenuItem key={x} value={item.option_number? splitOptions(item.option_number)[idx] : x}>
              {x}
            </MenuItem>
          );
        })}
      </Select> */}
       <Autocomplete
        key={item.id}
        size="small"
        options={
          item.option_value? item.option_value.split(",") : []
        }
        // autoHighlight
        value={
          item.option_value[item.name]
            ? item.option_value[item.name].filter(
                (data) => data.id == field.value || data === field.value
              )[0]
            : multipleChoice && !field.value
            ? []
            : field.value
        }
        getOptionLabel={(option1) => {
        console.log(`🚀 ~ file: index.jsx ~ line 149 ~ {/*{item.option_value.split ~ option1`, option1)
          // let selected = item.option_value[item.name] ? item.option_value[item.name].filter(
          //   (data) => data.id === option1 || data === option1
          // ) : [];
          return option1[item.option_name || "name"] || (typeof(option1) == 'number' ? option1.toString() : option1);
          // return option1
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          console.log({options, params, filtered});
  
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== '' && !isExisting) {
            filtered.push(
              inputValue
             );
          }
  
          return filtered;
        }}
        // getOptionSelected={(option, data) => {
        //   console.log({ value, option });
        //   return option.id === value || option === value;
        // }}
        // renderOption={(option, data) => {
        //   console.log({ option, data });
        //   return (
        //     <React.Fragment>
        //       <span>{option[item.option_name || 'name'] || option}</span>
        //     </React.Fragment>
        //   );
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            item={item.id}
            fullWidth
            inputProps={{
              ...params.inputProps,
              // autoComplete: "disabled", // disable autocomplete and autofill
            }}
          />
        )}
        multiple={
          multipleChoice != false && multipleChoice != undefined ? true : false
        }
        // multiple
        onChange={(event, data) => {
          data =
            data && data.id
              ? data.id
              : multipleChoice
              ? data.map((dt) => dt.id || dt)
              : data;
          field.onChange(data);
        }}
				isOptionEqualToValue={(option, value) => option === value || option.id === value.id || option.id === value}
        defaultValue={multipleChoice ? [] : ""}
        // {...field}
      />
    </FormControl>
  );
}