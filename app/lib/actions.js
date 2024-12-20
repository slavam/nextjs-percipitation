'use server';

// import { z } from 'zod'
import connection from '@/app/mysql'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth'

export async function authenticate(prevState,formData) {
  // console.log(formData)
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
 
   
// const CreateInvoice = FormSchema.omit({ id: true, date: true })
// const UpdateInvoice = FormSchema.omit({ id: true, date: true })

// export async function createMeasurement(formData){
  // const rawFormData = {
    // temperature: formData.get('temperature'),
    // amount: formData.get('amount'),
    // status: formData.get('status'),
  // }

  // revalidatePath('/dashboard/precipitation')
  // redirect('/dashboard/precipitation')
// }
// export const dynamic = 'force-dynamic'

// export async function getWeather(station,observDate){
//   const query = `http://10.54.1.30:8640/get?limit=10&stations=${station}&quality=1&source=100&streams=1&hashes=-789901366,1345858116,795976906,1223041370&local=1&notbefore=${observDate}&notafter=${observDate}`
//   try {
//     const weather = await fetch(query)
//     return await weather.json()
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// export async function createMeasurement(prevState, weather, formData) {
//   let measurement = {};
//   if (this.state.weather == null || Object.keys(this.state.weather).length === 0) {
//     alert('Нет данных о погоде!');
//     return;
//   }
//   if (Object.keys(this.state.values).length === 0) {
//     alert('Нет данных о концентрациях!')
//     return
//   }
//   measurement.date = this.state.date.trim()
//   measurement.post_id = this.state.postId
//   measurement.term = this.state.term
//   measurement.wind_direction = this.state.weather.wind_direction
//   measurement.wind_speed = this.state.weather.wind_speed
//   measurement.temperature = this.state.weather.temperature
//   measurement.phenomena = this.state.weather.phenomena
//   measurement.relative_humidity = this.state.weather.relative_humidity
//   measurement.partial_pressure = this.state.weather.partial_pressure
//   measurement.atmosphere_pressure = this.state.weather.atmosphere_pressure
//   this.state.error = ''
//   $.ajax({
//     type: 'POST',
//     url: "create_or_update",
//     data: {measurement: measurement, values: values}
//   }).done(function(data) {
//     var cs = {}
//     if (Object.keys(data.concentrations).length > 0) {
//       Object.keys(data.concentrations).forEach((k) => cs[k] = data.concentrations[k].concentration)
//     }
//     that.setState({error: data.error, concentrations: data.concentrations, concs: cs})
//   }.bind(this))
//   .fail(function(res) {
//     that.setState({values: {}, value: '', error: "Ошибка при сохранении данных. Дублирование записи."})
//   })
//   revalidatePath('/dashboard/measurements')
//   redirect('/dashboard/measurements')
// }

export async function createInvoice(prevState, formData) {
    // const validatedFields = CreateInvoice.safeParse({
    //   customerId: formData.get('customerId'),
    //   amount: formData.get('amount'),
    //   status: formData.get('status'),
    // })
    // if (!validatedFields.success) {
    //   return {
    //     errors: validatedFields.error.flatten().fieldErrors,
    //     message: 'Missing Fields. Failed to Create Invoice.',
    //   };
    // }
    // const { customerId, amount, status } = validatedFields.data
    // const amountInCents = amount * 100
    // const date = new Date().toISOString().split('T')[0]
    // try {
    //   await sql`
    //     INSERT INTO invoices (customer_id, amount, status, date)
    //     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    //   `  
    // } catch (error) {
    //   return {message: 'Database Error: Failed to Create Invoice.'}  
    // }
    
    revalidatePath('/dashboard/precipitation')
    redirect('/dashboard/precipitation')
  }

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
  
//   const amountInCents = amount * 100;
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return {message: 'Database Error: Failed to Update Invoice.'}
//   }
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

export async function deleteMeasurement(id) {
  try {
    const delPollutions = await connection.promise().query(`DELETE FROM pollution_values WHERE measurement_id = ${id};`)
    const delMeasurement = await connection.promise().query(`DELETE FROM measurements WHERE id = ${id};`)
    await Promise.all([
      delPollutions,
      delMeasurement
    ])
    revalidatePath('/dashboard/measurements')
    return { message: 'Измерение удалено.' }
  } catch (error) {
    console.error(error)
    return {message: 'Database Error: Failed to Delete Measurement.'}
  }
}

export async function viewMeasurement(id) {
  try {
    const pollutions = await connection.promise().query(`SELECT * FROM pollution_values WHERE measurement_id = ${id};`);
    return await pollutions.json()
  } catch (err) {
    console.error(err);
    return [];
  }
}