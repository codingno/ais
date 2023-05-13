import { useRouter } from 'next/router'

import List from '../../../components/utils/List'
import BasicLayout from '../../../components/utils/BasicLayout';

export default function () {
	const router = useRouter()

  return (
		<BasicLayout
					title="Identity Types"
		>
				<List 
					title="Identity Types"
					name="Identity"
					getUrl="/api/identity-type"
					addLink="/master-admin/identity-type/create"
					tableHead={[
						{ id: 'name', label: 'Name', alignRight: false },
						{ id: 'description', label: 'Description', alignRight: false },
						{ id: '' }
					]}
					moremenu={[
						{
							name : 'Edit',
							link : '/master-admin/identity-type/edit/',
						}
					]}
					deleteOptions={{
						link : '/api/identity-type',
						note: 'Are you sure to delete this item?'
					}}
				/>
		</BasicLayout>
  );
}
