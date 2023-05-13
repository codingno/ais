import { useRouter } from 'next/router'

import List from '../../../components/utils/List'

import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
	const router = useRouter()

  return (
		<BasicLayout
			title="Course Groups"
		>
				<List 
					title="Course Groups"
					name="Course Group"
					getUrl="/api/course-group"
					addLink="/master-admin/course-group/create"
					tableHead={[
						{ id: 'name', label: 'Name', alignRight: false },
						{ id: 'description', label: 'Description', alignRight: false },
						{ id: '' }
					]}
					moremenu={[
						{
							name : 'Edit',
							link : '/master-admin/course-group/edit/',
						}
					]}
					deleteOptions={{
						link : '/api/course-group',
						note: 'Are you sure to delete this item?'
					}}
				/>
		</BasicLayout>
  );
}
