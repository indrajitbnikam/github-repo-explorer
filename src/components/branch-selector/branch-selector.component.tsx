import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { fetchRepoBranches } from '../../services/github-api.service';
import { createStructuredSelector } from 'reselect';
import { selectRepoApiUrl } from '../../store/explorer/explorer.selectors';
import { connect } from 'react-redux';
import { ExplorerAction } from '../../store/explorer/explorer.types';
import { setRepoBranch } from '../../store/explorer/explorer.actions';
const { Option } = Select;

const BranchSelector = ({ repoApiUrl, setNewRepoBranch }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  useEffect(() => {
    const fetchAndSetBranches = async (repoApiUrl: string) => {
      setIsLoading(true);
      const result = await fetchRepoBranches(repoApiUrl);
      if (result.status === 200) {
        setBranches(result.data);
        setSelectedBranch('');
      }
      setIsLoading(false);
    }

    fetchAndSetBranches(repoApiUrl);
  }, [repoApiUrl])

  const handleSelectBranch = (branchName: string) => {
    setSelectedBranch(branchName);
    setNewRepoBranch(branchName);
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
      loading={isLoading}
      value={selectedBranch}
      onSelect={(branchName: string) => handleSelectBranch(branchName)}
    >
      {
        branches.length ? (
          branches.map(({ name }) => <Option key={name} value={name}>{name}</Option>)
        ) : null
      }
  </Select>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoApiUrl: selectRepoApiUrl
});

const mapDispatchToProps = (dispatch: (action: ExplorerAction) => void) => ({
  setNewRepoBranch: (branchName: string) => dispatch(setRepoBranch(branchName))
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSelector);
